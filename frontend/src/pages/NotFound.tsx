// Path: frontend/src/pages/NotFound.tsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="mb-2 text-4xl font-bold text-navy">404</h1>
      <p className="mb-6 text-navy/60">Page not found.</p>
      <Link to="/" className="font-semibold text-accent hover:underline">Back to Home →</Link>
    </div>
  );
}
