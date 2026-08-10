// Path: frontend/src/components/layout/TopBar.tsx
export default function TopBar() {
  return (
    <div className="hidden w-full bg-navy-dark px-6 py-2 text-xs text-white/90 md:flex md:items-center md:justify-between">
      <div className="flex items-center gap-6">
        <span>+91 9876543210</span>
        <span>Marketing@blitz.com</span>
        <span>SIDCO Industrial Estate Shornur</span>
      </div>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        aria-label="Facebook"
      >
        f
      </a>
    </div>
  );
}
