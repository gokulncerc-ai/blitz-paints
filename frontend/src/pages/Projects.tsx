import { useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Phone } from 'lucide-react';
import { getProjects } from '../api/projects';
import { ProjectItem } from '../types';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import Gallery1 from '../assets/images/images/gallery1.jpg';
import review1 from '../assets/vedio/review1.mp4';
import review2 from '../assets/vedio/review2.mp4';
import review3 from '../assets/vedio/review3.mp4';

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/blitz_paints?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  facebook: 'https://www.facebook.com/blitzpaints',
  youtube: 'https://youtu.be/IB28FlNl_u4',
};

const GALLERY_HASHTAGS = [
  '#BlitzPaints',
  '#BlitzEpoxy',
  '#EpoxyCoating',
  '#MetalProtection',
  '#IndustrialCoatings',
  '#BuiltToProtect',
  '#EngineeredToBond',
  '#QualityCoatings',
];

const CUSTOMER_REVIEWS = [
  { id: 'review-1', src: review1, title: 'Customer Review' },
  { id: 'review-2', src: review2, title: 'Customer Review' },
  { id: 'review-3', src: review3, title: 'Customer Review' },
];

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading projects..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      {/* GALLERY - FEATURED SPOTLIGHT WITH CAPTION */}
      <section className="mt-20">
        <h2 className="mb-8 font-inter font-bold text-[28px] sm:text-[32px] text-[#000080]">
          Gallery
        </h2>

        <div className="overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm md:flex">
          <div className="md:w-1/2">
            <img
              src={Gallery1}
              alt="Powerful Protection Against Rust - Blitz Epoxy"
              className="h-72 w-full object-cover md:h-full"
            />
          </div>

          <div className="flex flex-col justify-center p-8 md:w-1/2">
            <h3 className="font-inter font-bold text-[22px] text-[#2E1B66] mb-3">
              Powerful Protection Against Rust
            </h3>
            <p className="font-inter text-[15px] leading-[170%] text-gray-600 mb-4">
              Designed to withstand the challenges of rust, Blitz Epoxy is a reliable epoxy
              coating that combines strong bonding with long-lasting protection.
            </p>
            <p className="font-inter font-bold text-[15px] text-[#F86B06] mb-4">
              Engineered to Bond. Built to Protect.
            </p>
            <p className="font-inter text-[14px] text-gray-700 flex items-center gap-2 mb-4">
              <Phone size={16} className="text-[#F86B06]" />
              0466 2220693 | +91 90723 53003
            </p>
            <div className="flex flex-wrap gap-2">
              {GALLERY_HASHTAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#000080]/5 px-3 py-1 font-inter text-[12px] font-semibold text-[#000080]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS - VIDEO TESTIMONIALS */}
      <section className="mt-20">
        <h2 className="mb-8 font-inter font-bold text-[28px] sm:text-[32px] text-[#000080]">
          Customer Reviews
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm"
            >
              <video
                src={review.src}
                controls
                playsInline
                preload="metadata"
                className="h-64 w-full bg-black object-contain"
              />
              <div className="p-4">
                <p className="font-inter font-semibold text-[15px] text-[#2E1B66]">
                  {review.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL LINKS */}
      <section className="mt-20 rounded-[16px] bg-[#6fa8dc] px-8 py-10 text-center">
        <h2 className="mb-2 font-inter font-bold text-[24px] text-white">Follow Blitz Paints</h2>
        <p className="mb-6 font-inter text-[15px] text-white/80">
          See more projects, reviews, and updates on our social pages.
        </p>
        <div className="flex items-center justify-center gap-6">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Blitz Paints on Instagram"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#000080] transition-transform hover:scale-110"
          >
            <FaInstagram size={22} />
          </a>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Blitz Paints on Facebook"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#000080] transition-transform hover:scale-110"
          >
            <FaFacebook size={22} />
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Blitz Paints on Youtube"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#000080] transition-transform hover:scale-110"
          >
            <FaYoutube size={22} />
          </a>
        </div>
      </section>
    </div>
  );
}