// Path: frontend/src/components/ui/Loader.tsx
export default function Loader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-16 text-navy/70">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy/20 border-t-accent" />
      <span className="ml-3 text-sm">{label}</span>
    </div>
  );
}
