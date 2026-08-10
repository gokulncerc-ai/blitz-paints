// Path: frontend/src/components/home/ColourStudio.tsx
// "Find Your Perfect Palette" section:
//  - Left: headline, copy, Launch Colour Studio button
//  - Middle: family filter tabs + scrollable swatch grid
//  - Right: layout preview panel with an eye icon (fullscreen view) and a
//    change icon (opens the layout picker modal). Clicking "Launch Colour
//    Studio" runs applyWallColor() (Canvas + a precomputed wall mask) so
//    ONLY the wall in the photo gets repainted - furniture, floor, windows,
//    etc. stay exactly as they were.

import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { getColours } from '../../api/colours';
import { ColourShade, ColourFamily } from '../../types';
import Loader from '../ui/Loader';
import DesignColorLayout, { LAYOUT_OPTIONS, LayoutOption } from '../layout/DesignColorLayout';
import { applyWallColor } from '../../utils/applyWallColor';

const FAMILIES: { key: ColourFamily | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'reds', label: 'Reds' },
  { key: 'oranges', label: 'Oranges' },
  { key: 'yellows', label: 'Yellows' },
  { key: 'greens', label: 'Greens' },
  { key: 'teals', label: 'Teals' },
  { key: 'blues', label: 'Blues' },
  { key: 'purples', label: 'Purples' },
  { key: 'pinks', label: 'Pinks' },
  { key: 'browns', label: 'Browns' },
  { key: 'neutrals', label: 'Neutrals' },
  { key: 'whites', label: 'Whites' },
];

export default function ColourStudio() {
  const [shades, setShades] = useState<ColourShade[]>([]);
  const [loading, setLoading] = useState(true);
  const [family, setFamily] = useState<ColourFamily | 'all'>('all');

  // Swatch the user has clicked but not yet applied
  const [pickedShadeId, setPickedShadeId] = useState<string | null>(null);
  const pickedColor = shades.find((s) => s.id === pickedShadeId)?.hexCode ?? null;
  // Data URL of the layout photo with the wall repainted (set by "Launch Colour Studio")
  const [paintedImage, setPaintedImage] = useState<string | null>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [paintError, setPaintError] = useState<string | null>(null);

  const [layout, setLayout] = useState<LayoutOption>(LAYOUT_OPTIONS[0]);
  const [isLayoutModalOpen, setLayoutModalOpen] = useState(false);
  const [isFullscreenOpen, setFullscreenOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPickedShadeId(null);
    getColours(family === 'all' ? undefined : { family })
      .then(setShades)
      .catch(() => setShades([]))
      .finally(() => setLoading(false));
  }, [family]);

  async function handleLaunch() {
    if (!pickedColor) return;
    setIsPainting(true);
    setPaintError(null);
    try {
      const result = await applyWallColor({
        imageSrc: layout.image,
        maskSrc: layout.mask,
        hexColor: pickedColor,
      });
      setPaintedImage(result);
    } catch (err) {
      setPaintError('Could not paint the wall. Try a different layout or colour.');
      console.error(err);
    } finally {
      setIsPainting(false);
    }
  }

  function handleSelectLayout(next: LayoutOption) {
    setLayout(next);
    setPaintedImage(null); // previous paint job was for a different photo/mask
    setLayoutModalOpen(false);
  }

  const displayedImage = paintedImage || layout.image;

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid gap-8 rounded-[20px] bg-[#E5F0F5] p-8 lg:grid-cols-[1fr_1.15fr_1.2fr]">
        {/* Headline + copy + button */}
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-4xl font-bold leading-tight text-[#000080] lg:text-[48px]">
            Find Your
            <br />
            Perfect Palette
          </h2>
          <p className="mb-6 text-base font-medium leading-snug text-black/80 lg:text-xl">
            Explore 100+ Shade and create
            <br />
            Beautiful combination for your
            <br />
            space with our colour studio
          </p>

          <button
            onClick={handleLaunch}
            disabled={!pickedColor || isPainting}
            className="w-full max-w-[341px] rounded-[10px] bg-[#000080] py-4 font-semibold text-white transition hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPainting ? 'Painting the wall...' : 'Launch Colour Studio'}
          </button>
          {!pickedColor && !isPainting && (
            <p className="mt-2 text-xs text-navy/50">Pick a shade on the right, then hit Launch.</p>
          )}
          {paintError && <p className="mt-2 text-xs text-red-600">{paintError}</p>}
        </div>

        {/* Family tabs + colour swatch grid */}
        <div className="flex flex-col h-[320px] lg:h-[400px]">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {FAMILIES.map((f) => (
              <button
                key={f.key}
                onClick={() => setFamily(f.key)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${family === f.key ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-navy/10'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <Loader label="Loading palette..." />
          ) : shades.length === 0 ? (
            <p className="text-sm text-navy/60">No shades found in this family yet.</p>
          ) : (
            <div className="grid flex-1 auto-rows-min grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-3 overflow-y-auto pr-1">              {shades.map((s) => {
              const isPicked = s.id === pickedShadeId;
              return (
                <button
                  key={s.id}
                  title={s.name}
                  onClick={() => setPickedShadeId(s.id)}
                  className={`aspect-square rounded-md transition-transform hover:scale-105 ${isPicked ? 'scale-105 ring-4 ring-navy ring-offset-2' : ''
                    }`}
                  style={{ backgroundColor: s.hexCode }}
                />
              );
            })}
            </div>
          )}
        </div>

        {/* Layout preview panel */}
        <div className="relative overflow-hidden rounded-[20px] bg-white">
          <img
            src={displayedImage}
            alt={layout.label}
            className="h-[280px] w-full object-cover lg:h-[400px]"
          />

          {isPainting && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <Loader label="Painting the wall..." />
            </div>
          )}

          {/* Eye icon - fullscreen preview */}
          <button
            onClick={() => setFullscreenOpen(true)}
            aria-label="View layout fullscreen"
            title="View fullscreen"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy shadow hover:bg-white"
          >
            <FaEye size={16} />
          </button>

          {/* Change icon - open layout picker */}
          <button
            onClick={() => setLayoutModalOpen(true)}
            aria-label="Change layout"
            title="Change layout"
            className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy shadow hover:bg-white"
          >
            <FiRefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Layout picker modal */}
      <DesignColorLayout
        isOpen={isLayoutModalOpen}
        selectedId={layout.id}
        onSelect={handleSelectLayout}
        onClose={() => setLayoutModalOpen(false)}
      />

      {/* Fullscreen preview modal (eye icon) */}
      {isFullscreenOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setFullscreenOpen(false)}
        >
          <button
            onClick={() => setFullscreenOpen(false)}
            aria-label="Close fullscreen preview"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy hover:bg-white"
          >
            <IoClose size={20} />
          </button>

          <div
            className="relative max-h-full max-w-5xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={displayedImage} alt={layout.label} className="max-h-[85vh] w-full object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}