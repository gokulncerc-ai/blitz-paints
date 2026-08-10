// Path: frontend/src/pages/Services.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api/services';
import { Service } from '../types';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import serviceImage from '../assets/images/images/serviceImage.png';
import PaintingService from '../assets/images/images/PaintingServices.jpg';
import WaterProofing from '../assets/images/images/Waterproofing.webp';
import TileCoating from '../assets/images/images/tilesCoating.webp';

// Maps each backend `serviceType` to its bundled image
const SERVICE_IMAGES: Record<string, string> = {
  interior_painting: PaintingService,
  exterior_painting: PaintingService,
  waterproofing: WaterProofing,
  tile_coating: TileCoating,
};

function getServiceImage(service: Service): string {
  return SERVICE_IMAGES[service.serviceType] || PaintingService;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO SECTION WITH FULLY VISIBLE BACKGROUND IMAGE & TEXT OVERLAY */}
      <section className="relative min-h-[300px] sm:min-h-[360px] w-full flex items-end overflow-hidden">
        {/* BACKGROUND IMAGE CONTAINER */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={serviceImage}
            alt="Blitz Paints Services Background"
            className="w-full h-full object-cover object-center"
          />
          {/* LIGHT BOTTOM-ONLY GRADIENT - JUST ENOUGH FOR TEXT CONTRAST, IMAGE STAYS CLEARLY VISIBLE */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>

        {/* HERO CONTENT OVERLAY */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8 sm:pb-10 text-center w-full">
          <h1 className="font-inter font-bold text-[24px] sm:text-[30px] lg:text-[34px] leading-[120%] text-white mb-2 drop-shadow-md">
            Our Services
          </h1>
          <p className="font-inter text-[13px] sm:text-[15px] text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow">
            End-to-end painting, waterproofing, and tile solutions - delivered with the same
            durability and finish quality we build into every Blitz Paints product.
          </p>
        </div>
      </section>

      {/* SERVICES LISTING SECTION */}
      <div className="mx-auto max-w-[1627px] px-4 sm:px-6 lg:px-12 py-14">
        {loading && <Loader label="Loading services..." />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <div>
            {services.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-inter text-[20px] text-gray-500">No services found.</p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {services.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${s.slug}`}
                    className="group w-full max-w-[420px] overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                  >
                    {/* SERVICE IMAGE */}
                    <div className="relative h-[220px] w-full overflow-hidden">
                      <img
                        src={getServiceImage(s)}
                        alt={s.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {s.isFeatured && (
                        <span className="absolute top-4 right-4 rounded-full bg-[#F86B06] px-3 py-1 text-xs font-bold text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* SERVICE DETAILS */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-inter font-bold text-[22px] leading-[120%] text-[#2E1B66] mb-2">
                        {s.name}
                      </h3>
                      <p className="font-inter text-[14px] leading-[160%] text-gray-500 mb-6 flex-1 line-clamp-3">
                        {s.description}
                      </p>

                      <span className="inline-flex items-center gap-2 font-inter font-bold text-[16px] text-[#F86B06] group-hover:gap-3 transition-all">
                        Learn More &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}