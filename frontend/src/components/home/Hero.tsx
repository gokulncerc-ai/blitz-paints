import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Model & Hero Badge Assets
import ModelPreview from '../../assets/images/modelpreview.png';
import ModeModelPreviewl from '../../assets/images/modelpreview1.png';
import ModeModelPreview2 from '../../assets/images/modelpreview2.png';
import ModeModelPreview3 from '../../assets/images/modelpreview3.png';
import ModeModelPreview4 from '../../assets/images/modelpreview4.png';
import ModelPreview5 from '../../assets/images/onamblitz.png';
import {
  ShieldCheck, Sun, Leaf, Award, PaintBucket, Ruler
} from 'lucide-react';
// Stat Card Icons
import homeIcon from '../../assets/images/home/home.png';
import contractorIcon from '../../assets/images/home/contractor.png';

const STATS = [
  { value: '40+', label: 'Products', icon: PaintBucket },
  { value: '3000+', label: 'Happy Homes', icon: homeIcon },
  { value: '50+', label: 'Projects', icon: contractorIcon },
  { value: 'Over 5 Million+', label: 'Sq.ft Painted', icon: Ruler },
];

const CAROUSEL_IMAGES = [
  ModelPreview,
  ModeModelPreviewl,
  ModeModelPreview2,
  ModeModelPreview3,
  ModeModelPreview4,
  ModelPreview5,
];
const SLIDE_INTERVAL_MS = 4500;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % CAROUSEL_IMAGES.length) + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  }, []);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance timer. Re-runs (and therefore resets) every time `current`
  // changes - whether that change came from the timer itself, an arrow
  // click, or a dot click - so a manual interaction always gets a full
  // fresh interval before the next auto-advance. Paused while hovering.
  useEffect(() => {
    if (isHovering) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, SLIDE_INTERVAL_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isHovering]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  }

  return (
    <section
      className="relative w-full max-w-[1763px] mx-auto overflow-hidden bg-white lg:min-h-[882px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={handleKeyDown}
    >

      {/* MOBILE/TABLET: CAROUSEL AS A NORMAL TOP IMAGE BLOCK (not absolute) */}
      <div
        className="relative w-full h-[260px] sm:h-[360px] overflow-hidden lg:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Blitz Paints hero image carousel"
      >
        {CAROUSEL_IMAGES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Blitz Paints hero slide ${index + 1}`}
            aria-hidden={index !== current}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}

        {/* MOBILE ARROWS */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#000080] shadow-md transition hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#000080]"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#000080] shadow-md transition hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#000080]"
        >
          <ChevronRight size={20} />
        </button>

        {/* MOBILE DOTS */}
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {CAROUSEL_IMAGES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Slide ${index + 1}`}
              aria-current={index === current}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${index === current ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'
                }`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP: FULL BACKGROUND CAROUSEL - lg and up only */}
      <div
        className="hidden lg:block absolute inset-0 z-0 w-full h-[882px] overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Blitz Paints hero image carousel"
      >
        {CAROUSEL_IMAGES.map((src, index) => (
          <div
            key={src}
            aria-hidden={index !== current}
            className={`absolute inset-0 flex justify-end transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={src}
              alt={`Blitz Paints hero slide ${index + 1}`}
              className="h-full w-auto max-w-none object-contain object-right antialiased"
              style={{
                imageRendering: 'crisp-edges',
                WebkitFontSmoothing: 'antialiased',
              }}
            />
          </div>
        ))}
      </div>

      {/* DESKTOP ARROWS - sit above both the image layer and the foreground
          content layer so they stay clickable regardless of what's under them */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="hidden lg:flex absolute left-4 top-[55%] z-20 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#000080] shadow-md transition hover:bg-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#000080]"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="hidden lg:flex absolute right-4 top-[55%] z-20 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#000080] shadow-md transition hover:bg-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#000080]"
      >
        <ChevronRight size={26} />
      </button>

      {/* DESKTOP DOTS */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 z-20 -translate-x-1/2 items-center gap-2.5">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === current}
            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${index === current ? 'w-8 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/80'
              }`}
          />
        ))}
      </div>

      {/* FOREGROUND CONTENT LAYER */}
      <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-[43px] pt-6 sm:pt-8 pb-10 sm:pb-16 flex flex-col justify-between">
        {/* LEFT SIDE MAIN CONTENT */}
        <div className="flex flex-col max-w-[749px]">
          {/* TAGLINE - GLASSMORPHIC BADGES */}
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
            {['Colour', 'Performance', 'Protection'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-[#000080]/10 border border-[#000080]/20 px-3.5 sm:px-4 py-1.5 text-[13px] sm:text-[15px] font-semibold text-[#000080] backdrop-blur-xs transition hover:bg-[#000080]/15"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* MAIN HEADING */}
          <h1 className="font-inter font-bold text-[28px] sm:text-[36px] lg:text-[48px] leading-[110%] lg:leading-[105%] text-black mb-4 sm:mb-6 max-w-[513px]">
            Transforming Spaces <br />
            With <span className="text-[#000080]">High Durability</span> <br />
            Coatings
          </h1>
          {/* SUB-HEADLINE */}
          <p className="font-inter font-medium text-[16px] sm:text-[20px] lg:text-[24px] leading-[130%] lg:leading-[120%] text-black/90 mb-6 sm:mb-8 max-w-[520px]">
            Advanced Protection. Premium Finishes <br className="hidden sm:block" />
            Built For Every Climate
          </p>
          {/* BUTTON GROUP */}
          <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            {/* BUTTON 1: EXPLORE PRODUCTS */}
            <Link
              to="/products"
              className="flex h-[42px] sm:h-[48px] w-full xs:w-auto xs:min-w-[160px] sm:w-[180px] items-center justify-center rounded-[8px] bg-[#000080] border border-[#000080] transition-all duration-200 hover:bg-[#000066] active:scale-95 shadow-md"
            >
              <span className="font-inter font-normal text-[14px] sm:text-[16px] leading-none text-white">
                Explore Products
              </span>
            </Link>
            {/* BUTTON 2: CONTACT SUPPORT */}
            <Link
              to="/contact"
              className="flex h-[42px] sm:h-[48px] w-full xs:w-auto xs:min-w-[160px] sm:w-[180px] items-center justify-center rounded-[8px] bg-white border-2 border-[#000080] transition-all duration-200 hover:bg-slate-50 active:scale-95 shadow-md"
            >
              <span className="font-inter font-medium text-[14px] sm:text-[16px] leading-none text-[#2E1B66]">
                Contact Support
              </span>
            </Link>
          </div>
          {/* BADGES / FEATURE HIGHLIGHTS */}
          <div className="mt-4 lg:mt-[80px] w-full max-w-[950px] border border-gray-200/80 py-2.5 sm:py-4 bg-white/40 backdrop-blur-xs px-2 sm:px-5 rounded-2xl shadow-xs">
            <div className="grid grid-cols-4 items-center gap-1.5 sm:gap-4 lg:gap-6">
              {/* ITEM 1: TRUSTED EXCELLENCE */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="flex h-7 w-7 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#000080] text-white shrink-0">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-5 sm:w-5 lg:h-7 lg:w-7" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-inter font-bold text-[9px] xs:text-[11px] sm:text-[14px] xl:text-[18px] leading-[115%] text-[#000080]">
                    Several Years <br /> of Trusted <br /> Excellence
                  </span>
                  <span className="font-inter font-normal text-[7px] xs:text-[9px] sm:text-[11px] xl:text-[12px] leading-[120%] text-gray-700 mt-0.5">
                    Built on Experience. <br /> Focused on You.
                  </span>
                </div>
              </div>

              {/* ITEM 2: ALL-WEATHER PROTECTION */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="flex h-7 w-7 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#000080] text-white shrink-0">
                  <Sun className="h-3.5 w-3.5 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-white stroke-[2.5]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-inter font-bold text-[9px] xs:text-[11px] sm:text-[14px] xl:text-[18px] leading-[115%] text-[#000080]">
                    All-Weather <br /> Protection
                  </span>
                  <span className="font-inter font-normal text-[7px] xs:text-[9px] sm:text-[11px] xl:text-[12px] leading-[120%] text-gray-700 mt-0.5">
                    Built to Withstand <br /> Every Climate
                  </span>
                </div>
              </div>

              {/* ITEM 3: ECO CONSCIOUS */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="flex h-7 w-7 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#000080] text-white shrink-0">
                  <Leaf className="h-3.5 w-3.5 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-inter font-bold text-[9px] xs:text-[11px] sm:text-[14px] xl:text-[18px] leading-[115%] text-[#000080]">
                    Eco <br /> Conscious
                  </span>
                  <span className="font-inter font-normal text-[7px] xs:text-[9px] sm:text-[11px] xl:text-[12px] leading-[120%] text-gray-700 mt-0.5">
                    Safer for You <br /> Greener for Tomorrow
                  </span>
                </div>
              </div>

              {/* ITEM 4: CERTIFIED QUALITY */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="flex h-7 w-7 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#000080] text-white shrink-0">
                  <Award className="h-3.5 w-3.5 sm:h-5 sm:w-5 lg:h-7 lg:w-7" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-inter font-bold text-[9px] xs:text-[11px] sm:text-[14px] xl:text-[18px] leading-[115%] text-[#000080]">
                    Certified <br /> Quality
                  </span>
                  <span className="font-inter font-normal text-[7px] xs:text-[9px] sm:text-[11px] xl:text-[12px] leading-[120%] text-gray-700 mt-0.5">
                    ISO Standards <br /> You Can Trust
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
        {/* BOTTOM STATS CARD */}
        <div className="mt-4 sm:mt-6 lg:mt-[40px] mx-auto w-[92%] sm:w-full max-w-[1280px] min-h-[80px] sm:min-h-[96px] rounded-[8px] sm:rounded-[10px] bg-white p-2.5 sm:p-4 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 items-center">
          {STATS.map((item) => {
            // Determine if the icon is a Lucide Component or an Image Path String
            const IconComponent = typeof item.icon !== 'string' ? item.icon : null;

            return (
              <div key={item.label} className="flex items-center gap-2 sm:gap-3.5 justify-start min-w-0">
                {/* Icon Box */}
                <div className="flex h-[38px] w-[38px] sm:h-[60px] sm:w-[60px] items-center justify-center rounded-[6px] sm:rounded-[10px] bg-[#D9D9D9] flex-shrink-0">
                  {IconComponent ? (
                    /* Render as React Component */
                    <IconComponent className="h-4 w-4 sm:h-7 sm:w-7 text-[#000080]" />
                  ) : (
                    /* Render as Image Tag */
                    <img
                      src={item.icon as string}
                      alt={item.label}
                      className="h-4 w-4 sm:h-7 sm:w-7 object-contain"
                    />
                  )}
                </div>

                {/* Text Area */}
                <div className="flex flex-col justify-center min-w-0">
                  <span className="font-inter font-bold text-[13px] sm:text-[18px] lg:text-[20px] xl:text-[22px] leading-tight text-[#000080] whitespace-nowrap">
                    {item.value}
                  </span>
                  <span className="font-inter font-medium text-[10px] sm:text-[12px] lg:text-[13px] text-gray-800 mt-0.5 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}