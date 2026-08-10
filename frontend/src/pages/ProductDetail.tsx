import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../api/products';
import { submitEnquiry } from '../api/enquiries';
import { Product } from '../types';
import { getPaintImage } from '../assets/images/paints';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import Button from '../components/ui/Button';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({ name: '', email: '', phone: '', pincode: '', state: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProductBySlug(slug)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!product) return;
    setSubmitting(true);
    setSubmitMsg(null);
    try {
      await submitEnquiry({ ...form, enquiryType: 'product', productId: product.id });
      setSubmitMsg('Thank you! Our team will contact you soon.');
      setForm({ name: '', email: '', phone: '', pincode: '', state: '', message: '' });
    } catch (err: any) {
      setSubmitMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Loader label="Loading product..." />;
  if (error || !product) return <ErrorMessage message={error || 'Product not found'} />;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-xl bg-navy/5 p-10">
          <img
            src={getPaintImage(product.images?.[0])}
            alt={product.name}
            className="mx-auto h-72 object-contain"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-navy">{product.name}</h1>
          <p className="mt-3 text-navy/70">{product.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-navy/80">
            {product.coverageArea && <li>Coverage: {product.coverageArea}</li>}
            {product.lowVoc && <li>Low VOC formula</li>}
            {product.antiAlgae && <li>Anti-algae protection</li>}
          </ul>
          <form onSubmit={handleSubmit} className="mt-8 space-y-3 rounded-xl border border-navy/10 p-6">
            <h2 className="mb-2 font-bold text-navy">Quick Enquiry</h2>
            <p className="mb-2 text-sm text-navy/60">
              Enquiring about: <span className="font-semibold text-navy">{product.name}</span>
            </p>
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-navy/20 px-4 py-2"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md border border-navy/20 px-4 py-2"
            />
            <input
              required
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-md border border-navy/20 px-4 py-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="rounded-md border border-navy/20 px-4 py-2"
              />
              <input
                required
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="rounded-md border border-navy/20 px-4 py-2"
              />
            </div>
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-md border border-navy/20 px-4 py-2"
              rows={3}
            />
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
