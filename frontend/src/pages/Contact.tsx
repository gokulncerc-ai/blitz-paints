// Path: frontend/src/pages/Contact.tsx
import { FormEvent, useState } from 'react';
import { submitEnquiry } from '../api/enquiries';
import Button from '../components/ui/Button';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', pincode: '', state: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await submitEnquiry({ ...form, enquiryType: 'general' });
      setStatus('Thank you! Our team will contact you soon.');
      setForm({ name: '', email: '', phone: '', pincode: '', state: '', message: '' });
    } catch (err: any) {
      setStatus(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="mb-2 text-3xl font-bold text-navy">Contact Us</h1>
      <p className="mb-8 text-navy/60">SIDCO Industrial Estate, Shornur, Kerala - 679122 · +91 9876543210</p>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-xl border border-navy/10 p-8 md:grid-cols-2">
        <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-md border border-navy/20 px-4 py-2" />
        <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-md border border-navy/20 px-4 py-2" />
        <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-md border border-navy/20 px-4 py-2" />
        <input required placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="rounded-md border border-navy/20 px-4 py-2" />
        <input required placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="rounded-md border border-navy/20 px-4 py-2 md:col-span-2" />
        <textarea required placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-md border border-navy/20 px-4 py-2 md:col-span-2" rows={4} />
        <Button type="submit" disabled={submitting} className="md:col-span-2">
          {submitting ? 'Submitting...' : 'Submit Enquiry'}
        </Button>
        {status && <p className="text-sm text-navy/80 md:col-span-2">{status}</p>}
      </form>
    </div>
  );
}
