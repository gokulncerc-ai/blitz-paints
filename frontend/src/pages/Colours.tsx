// Path: frontend/src/pages/Colours.tsx
import { useEffect, useState } from 'react';
import { getColours } from '../api/colours';
import { ColourShade } from '../types';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function Colours() {
  const [shades, setShades] = useState<ColourShade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ColourShade | null>(null);

  useEffect(() => {
    getColours()
      .then(setShades)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading colour palette..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="mb-2 text-3xl font-bold text-navy">Colour Studio</h1>
      <p className="mb-8 text-navy/60">Tap a shade to preview it.</p>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="grid grid-cols-6 gap-3 lg:col-span-2">
          {shades.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              title={s.name}
              className="aspect-square rounded-md ring-2 ring-transparent transition hover:scale-105 hover:ring-navy"
              style={{ backgroundColor: s.hexCode }}
            />
          ))}
        </div>

        <div className="rounded-xl border border-navy/10 p-6">
          {selected ? (
            <>
              <div className="mb-4 h-40 rounded-md" style={{ backgroundColor: selected.hexCode }} />
              <h3 className="font-bold text-navy">{selected.name}</h3>
              <p className="text-sm text-navy/60">{selected.hexCode}</p>
            </>
          ) : (
            <p className="text-navy/60">Select a shade to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
