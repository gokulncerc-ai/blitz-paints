// Path: frontend/src/components/home/CTABanner.tsx
export default function CTABanner() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold">Need Expert Advice For Your Project</h2>
          <p className="mt-2 max-w-lg text-white/70">
            Our colour experts and technical teams are here to help you choose the right solutions.
          </p>
        </div>
        <a href="tel:+919876543210">
          <button className="rounded-md bg-accent px-8 py-3 font-semibold text-white hover:bg-accent-light">
            Call Us Now
          </button>
        </a>
      </div>
    </section>
  );
}
