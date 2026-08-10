// Path: frontend/src/pages/ServiceDetail.tsx
import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceBySlug } from '../api/services';
import { submitEnquiry } from '../api/enquiries';
import { Service } from '../types';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import Button from '../components/ui/Button';
import PaintingService from '../assets/images/images/PaintingServices.jpg';
import WaterProofing from '../assets/images/images/Waterproofing.webp';
import TileCoating from '../assets/images/images/tilesCoating.webp';

// Maps each backend `serviceType` to its bundled image - same mapping used
// in pages/Services.tsx, kept in sync so the listing and detail page always
// show the same image for a given service.
const SERVICE_IMAGES: Record<string, string> = {
  interior_painting: PaintingService,
  exterior_painting: PaintingService,
  waterproofing: WaterProofing,
  tile_coating: TileCoating,
};

function getServiceImage(service: Service): string {
  return SERVICE_IMAGES[service.serviceType] || PaintingService;
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', pincode: '', state: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!slug) return;
    getServiceBySlug(slug)
      .then(setService)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!service) return;
    setSubmitting(true);
    setSubmitMsg(null);
    try {
      await submitEnquiry({ ...form, enquiryType: 'service', serviceId: service.id });
      setSubmitMsg('Thank you! Our team will contact you soon.');
      setForm({ name: '', email: '', phone: '', pincode: '', state: '', message: '' });
    } catch (err: any) {
      setSubmitMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Loader label="Loading service..." />;
  if (error || !service) return <ErrorMessage message={error || 'Service not found'} />;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <img
          src={getServiceImage(service)}
          alt={service.name}
          className="h-80 w-full rounded-xl object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-navy">{service.name}</h1>
          <p className="mt-3 text-navy/70">{service.description}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-3 rounded-xl border border-navy/10 p-6">
            <h2 className="mb-2 font-bold text-navy">Request This Service</h2>
            <p className="mb-2 text-sm text-navy/60">
              Requesting: <span className="font-semibold text-navy">{service.name}</span>
            </p>
            <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-navy/20 px-4 py-2" />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-navy/20 px-4 py-2" />
            <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md border border-navy/20 px-4 py-2" />
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="rounded-md border border-navy/20 px-4 py-2" />
              <input required placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="rounded-md border border-navy/20 px-4 py-2" />
            </div>
            <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-md border border-navy/20 px-4 py-2" rows={3} />
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
            {submitMsg && <p className="text-sm text-navy/80">{submitMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}