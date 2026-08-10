// Modal for choosing what the Colour Studio preview panel paints:
//  - Presets: the 5 built-in room photos, each with a precomputed wall mask
//  - Upload: pick any photo from the device - it's sent to the backend,
//    which proxies it to the ML service for wall detection, and the
//    resulting mask comes back as an object URL (nothing is saved to disk
//    anywhere - it's a pure in-memory preview for this session)
//  - Camera: same flow, but the source photo comes from a live camera
//    capture instead of a file picker
// Every layout - preset or user-supplied - ends up as the same
// { id, label, image, mask } shape, so ColourStudio.tsx and
// applyWallColor.ts don't need to know or care where it came from.

import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiUpload, FiCamera } from 'react-icons/fi';
import { segmentWall, SegmentWallError } from '../../api/paint';

import im20 from '../../assets/images/layouts/im20.webp';
import livingroom from '../../assets/images/layouts/livingroom.webp';
import shades3 from '../../assets/images/layouts/shades3.webp';
import shades4 from '../../assets/images/layouts/shades4.webp';
import shades7 from '../../assets/images/layouts/shades7.webp';

import im20Mask from '../../assets/images/layouts/masks/im20-mask.png';
import livingroomMask from '../../assets/images/layouts/masks/livingroom-mask.png';
import shades3Mask from '../../assets/images/layouts/masks/shades3-mask.png';
import shades4Mask from '../../assets/images/layouts/masks/shades4-mask.png';
import shades7Mask from '../../assets/images/layouts/masks/shades7-mask.png';

export interface LayoutOption {
    id: string;
    label: string;
    image: string;
    /** Black/white image, same dimensions as `image`, white = wall. */
    mask: string;
}

// Add/remove entries here if more preset photos are dropped into
// src/assets/images/layouts/ later - just re-run generate_masks.py first so
// the matching "<name>-mask.png" exists in src/assets/images/layouts/masks/.
export const LAYOUT_OPTIONS: LayoutOption[] = [
    { id: 'im20', label: 'Modern Interior', image: im20, mask: im20Mask },
    { id: 'livingroom', label: 'Living Room', image: livingroom, mask: livingroomMask },
    { id: 'shades3', label: 'Accent Wall', image: shades3, mask: shades3Mask },
    { id: 'shades4', label: 'Cozy Corner', image: shades4, mask: shades4Mask },
    { id: 'shades7', label: 'Bright Space', image: shades7, mask: shades7Mask },
];

type Tab = 'presets' | 'upload' | 'camera';

interface DesignColorLayoutProps {
    isOpen: boolean;
    selectedId: string;
    onSelect: (layout: LayoutOption) => void;
    onClose: () => void;
}

export default function DesignColorLayout({
    isOpen,
    selectedId,
    onSelect,
    onClose,
}: DesignColorLayoutProps) {
    const [tab, setTab] = useState<Tab>('presets');
    const [isSegmenting, setIsSegmenting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Start/stop the camera as the user switches to/away from that tab
    useEffect(() => {
        if (!isOpen || tab !== 'camera') {
            cameraStream?.getTracks().forEach((track) => track.stop());
            setCameraStream(null);
            return;
        }

        let cancelled = false;
        navigator.mediaDevices
            ?.getUserMedia({ video: { facingMode: 'environment' } })
            .then((stream) => {
                if (cancelled) {
                    stream.getTracks().forEach((t) => t.stop());
                    return;
                }
                setCameraStream(stream);
                setCameraError(null);
                if (videoRef.current) videoRef.current.srcObject = stream;
            })
            .catch(() => setCameraError('Could not access the camera. Check browser permissions.'));

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, tab]);

    // Always release the camera when the modal itself closes
    useEffect(() => {
        if (!isOpen) cameraStream?.getTracks().forEach((track) => track.stop());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen) return null;

    async function handleFileLike(fileOrBlob: File | Blob, label: string) {
        setIsSegmenting(true);
        setError(null);
        try {
            const maskBlob = await segmentWall(fileOrBlob);
            const imageUrl = URL.createObjectURL(fileOrBlob);
            const maskUrl = URL.createObjectURL(maskBlob);

            onSelect({ id: `custom-${Date.now()}`, label, image: imageUrl, mask: maskUrl });
        } catch (err) {
            setError(
                err instanceof SegmentWallError
                    ? err.message
                    : 'Something went wrong detecting the wall. Please try again.'
            );
        } finally {
            setIsSegmenting(false);
        }
    }

    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) handleFileLike(file, file.name);
        e.target.value = ''; // allow re-selecting the same file later
    }

    function handleCapture() {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            if (blob) handleFileLike(blob, 'Camera photo');
        }, 'image/jpeg', 0.92);
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header bar */}
                <div className="flex items-center justify-between gap-3 bg-emerald-500 px-5 py-3">
                    <span className="text-sm font-semibold text-white">Choose a layout to paint</span>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
                    >
                        <IoClose size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-navy/10">
                    {([
                        { key: 'presets', label: 'Presets' },
                        { key: 'upload', label: 'Upload' },
                        { key: 'camera', label: 'Camera' },
                    ] as { key: Tab; label: string }[]).map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${tab === t.key ? 'border-b-2 border-navy text-navy' : 'text-navy/50 hover:text-navy'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="max-h-[420px] overflow-y-auto p-4">
                    {error && (
                        <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
                    )}

                    {isSegmenting && (
                        <p className="mb-3 rounded-md bg-navy/5 px-3 py-2 text-xs text-navy/70">
                            Detecting the wall in your photo...
                        </p>
                    )}

                    {tab === 'presets' && (
                        <div className="grid grid-cols-3 gap-3">
                            {LAYOUT_OPTIONS.map((option) => {
                                const isSelected = option.id === selectedId;
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => onSelect(option)}
                                        title={option.label}
                                        className={`overflow-hidden rounded-lg border-4 transition-all ${isSelected
                                            ? 'border-blue-500 ring-2 ring-blue-300'
                                            : 'border-transparent hover:border-blue-200'
                                            }`}
                                    >
                                        <img src={option.image} alt={option.label} className="h-24 w-full object-cover" />
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {tab === 'upload' && (
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-navy/20 py-10 text-navy/60 hover:border-navy/40 hover:bg-navy/5">
                            <FiUpload size={28} />
                            <span className="text-sm font-medium">Click to choose a photo from your device</span>
                            <span className="text-xs">JPG or PNG, up to 10MB</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileInputChange}
                                disabled={isSegmenting}
                            />
                        </label>
                    )}

                    {tab === 'camera' && (
                        <div className="flex flex-col items-center gap-3">
                            {cameraError ? (
                                <p className="py-10 text-center text-sm text-navy/60">{cameraError}</p>
                            ) : (
                                <>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full rounded-lg bg-black"
                                    />
                                    <button
                                        onClick={handleCapture}
                                        disabled={!cameraStream || isSegmenting}
                                        className="flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <FiCamera size={16} />
                                        Capture Photo
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}