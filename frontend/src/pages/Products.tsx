import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts } from '../api/products';
import { Product } from '../types';
import { getPaintImage } from '../assets/images/paints';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';

const TYPES = [
  { key: 'all', label: 'All' },
  { key: 'interior_wall_coating', label: 'Interior' },
  { key: 'exterior_wall_coating', label: 'Exterior' },
  { key: 'primer', label: 'Primers' },
  { key: 'specialty_coating', label: 'Specialty Coatings' },
];

function formatBadgeLabel(priceRange: string) {
  return priceRange.charAt(0).toUpperCase() + priceRange.slice(1);
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Full catalog page - no featured filter here. "all" fetches every
    // active product; a specific tab fetches every product of that type.
    const params = type === 'all' ? {} : { type };
    getProducts(params)
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div className="mx-auto max-w-[1627px] px-4 sm:px-6 lg:px-12 py-14">
      {/* PAGE HEADER */}
      <h1 className="font-inter font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[100%] text-[#000080] mb-3">
        Our Products
      </h1>
      <p className="font-inter text-[16px] sm:text-[18px] text-gray-500 mb-8">
        Engineered coatings for every surface and budget.
      </p>

      {/* TYPE FILTER TABS */}
      <div className="mb-6 flex flex-wrap items-center gap-4 sm:gap-8 lg:gap-[84px] overflow-x-auto pb-2 scrollbar-none">
        {TYPES.map((t) => {
          const isActive = type === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setSearchParams(t.key === 'all' ? {} : { type: t.key })}
              className={`font-inter font-bold text-[20px] sm:text-[24px] leading-[100%] transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                ? 'bg-[#000080] text-white rounded-[20px] px-6 py-2 shadow-sm'
                : 'text-[#000080] hover:opacity-80 px-2 py-2'
                }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* HORIZONTAL UNDERLINE SEPARATOR */}
      <div className="w-full border-t border-black mb-6 opacity-100" />

      {/* API LOADING & ERROR STATES */}
      {loading && <Loader label="Loading products..." />}
      {error && <ErrorMessage message={error} />}

      {/* PRODUCT GRID LISTING */}
      {!loading && !error && (
        <div>
          {products.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-inter text-[20px] text-gray-500">
                No products found for the selected category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="relative w-full max-w-[360px] bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-between"
                >
                  {/* PRICE TIER BADGE */}


                  {/* PRODUCT IMAGE + NAME - whole block links to the detail page */}
                  <Link to={`/products/${p.slug}`} className="w-full flex flex-col items-center">
                    <div className="w-full h-[240px] flex items-center justify-center mb-6">
                      <img
                        src={getPaintImage(p.images?.[0])}
                        alt={p.name}
                        className="w-[233px] h-[240px] object-contain"
                      />
                    </div>

                    <div className="w-full text-center flex flex-col items-center">
                      {/* FEATURE TAGS (LOW VOC / ANTI ALGAE) */}
                      <div className="mb-3 flex flex-wrap justify-center gap-3 text-xs font-semibold text-gray-500">
                        {p.lowVoc && <span>● Low Voc</span>}
                        {p.antiAlgae && <span>&#9812; Anti Algae</span>}
                      </div>

                      <h3 className="font-inter font-bold text-[22px] sm:text-[24px] leading-[110%] text-[#2E1B66] mb-1 line-clamp-2 hover:underline">
                        {p.name}
                      </h3>

                      {/* COVERAGE + FINISH LINE (e.g. "65-75 Sq.ft/2 Coats | Finish: Gloss") */}
                      {(p.coverageArea || p.finish) && (
                        <p className="font-inter text-[14px] text-gray-500 mb-6">
                          {p.coverageArea}
                          {p.coverageArea && p.finish ? ' | ' : ''}
                          {p.finish && `Finish: ${p.finish}`}
                        </p>
                      )}
                    </div>
                  </Link>

                  {/* QUICK ENQUIRY BUTTON */}
                  <Link
                    to={`/products/${p.slug}`}
                    className="w-full max-w-[160px] h-[38px] border-2 border-[#F86B06] text-[#F86B06] hover:bg-[#F86B06] hover:text-white transition-all rounded-[8px] flex items-center justify-center font-inter font-bold text-[14px] sm:text-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.25)] active:scale-95"
                  >
                    Quick Enquiry &rarr;
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}