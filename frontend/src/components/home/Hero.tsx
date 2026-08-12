import React from 'react';
import { Link } from 'react-router-dom';

// Model & Hero Badge Assets
import ModelPreview from '../../assets/images/modelpreview.png';
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

export default function Hero() {
  return (
    <section className="relative w-full max-w-[1763px] mx-auto overflow-hidden bg-white lg:min-h-[882px]">

      {/* MOBILE/TABLET: MODEL PREVIEW AS A NORMAL TOP IMAGE (not absolute) */}
      <div className="w-full h-[260px] sm:h-[360px] overflow-hidden lg:hidden">
        <img
          src={ModelPreview}
          alt="Painter applying Blitz Paints coating"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* DESKTOP: FULL BACKGROUND MODEL PREVIEW IMAGE - lg and up only */}
      <div className="hidden lg:flex absolute inset-0 z-0 w-full h-[882px] overflow-hidden justify-end">
        <img
          src={ModelPreview}
          alt="Painter applying Blitz Paints coating background"
          className="h-full w-auto max-w-none object-contain object-right antialiased"
          style={{
            imageRendering: 'crisp-edges',
            WebkitFontSmoothing: 'antialiased',
          }}
        />
      </div>

      {/* FOREGROUND CONTENT LAYER */}
      <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-[43px] pt-6 sm:pt-8 pb-10 sm:pb-16 flex flex-col justify-between">

        {/* LEFT SIDE MAIN CONTENT */}
        <div className="flex flex-col max-w-[749px]">

          {/* TAGLINE - SINGLE LINE / SMALL SPACES */}
          <h3 className="font-inter font-bold text-[18px] sm:text-[24px] text-[#2E1B66] mb-3 sm:mb-4 whitespace-nowrap">
            Colour <span className="text-[#0000FF] font-normal">•</span> Performance <span className="text-[#0000FF] font-normal">•</span> Protection
          </h3>
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
          <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-6 mb-8 sm:mb-10">
            {/* BUTTON 1: EXPLORE PRODUCTS */}
            <Link
              to="/products"
              className="flex h-[52px] sm:h-[63px] w-full xs:w-auto xs:min-w-[200px] sm:w-[237px] items-center justify-center rounded-[10px] bg-[#000080] border border-[#000080] transition-all duration-200 hover:bg-[#000066] active:scale-95 shadow-md"
            >
              <span className="font-inter font-normal text-[18px] sm:text-[24px] leading-none text-white">
                Explore Products
              </span>
            </Link>

            {/* BUTTON 2: CONTACT SUPPORT */}
            <Link
              to="/contact"
              className="flex h-[52px] sm:h-[63px] w-full xs:w-auto xs:min-w-[200px] sm:w-[237px] items-center justify-center rounded-[10px] bg-white border-[3px] sm:border-[4px] border-[#000080] transition-all duration-200 hover:bg-slate-50 active:scale-95 shadow-md"
            >
              <span className="font-inter font-medium text-[18px] sm:text-[24px] leading-none text-[#2E1B66]">
                Contact Support
              </span>
            </Link>
          </div>

          {/* BADGES / FEATURE HIGHLIGHTS */}
          <div className="mt-4 lg:mt-[80px] w-full max-w-[950px] min-h-[103px] grid grid-cols-2 md:grid-cols-4 items-center gap-4 sm:gap-6 border border-gray-200/80 py-4 bg-white/40 backdrop-blur-xs px-3 sm:px-5 rounded-2xl shadow-xs">

            {/* ITEM 1: TRUSTED EXCELLENCE */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#000080] text-white shrink-0">
                <ShieldCheck className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-bold text-[13px] sm:text-[16px] xl:text-[18px] leading-[115%] text-[#000080]">
                  Several Years <br /> of Trusted <br /> Excellence
                </span>
                <span className="font-inter font-normal text-[10px] sm:text-[11px] xl:text-[12px] leading-[120%] text-gray-700 mt-1">
                  Built on Experience. <br /> Focused on You.
                </span>
              </div>
            </div>

            {/* ITEM 2: ALL-WEATHER PROTECTION */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center text-[#000080] shrink-0">
                <Sun className="h-6 w-6 sm:h-8 sm:w-8 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-bold text-[13px] sm:text-[16px] xl:text-[18px] leading-[115%] text-[#000080]">
                  All-Weather <br /> Protection
                </span>
                <span className="font-inter font-normal text-[10px] sm:text-[11px] xl:text-[12px] leading-[120%] text-gray-700 mt-1">
                  Built to Withstand <br /> Every Climate
                </span>
              </div>
            </div>

            {/* ITEM 3: ECO CONSCIOUS */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#000080] text-white shrink-0">
                <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-bold text-[13px] sm:text-[16px] xl:text-[18px] leading-[115%] text-[#000080]">
                  Eco <br /> Conscious
                </span>
                <span className="font-inter font-normal text-[10px] sm:text-[11px] xl:text-[12px] leading-[120%] text-gray-700 mt-1">
                  Safer for You <br /> Greener for Tomorrow
                </span>
              </div>
            </div>

            {/* ITEM 4: CERTIFIED QUALITY */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#000080] text-white shrink-0">
                <Award className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-bold text-[13px] sm:text-[16px] xl:text-[18px] leading-[115%] text-[#000080]">
                  Certified <br /> Quality
                </span>
                <span className="font-inter font-normal text-[10px] sm:text-[11px] xl:text-[12px] leading-[120%] text-gray-700 mt-1">
                  ISO Standards <br /> You Can Trust
                </span>
              </div>
            </div>

          </div>
        </div>
        {/* BOTTOM STATS CARD */}
        <div className="mt-6 lg:mt-[40px] mx-auto w-full max-w-[1280px] min-h-[110px] rounded-[10px] bg-white p-3 sm:p-4 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-center">
          {STATS.map((item) => {
            // Determine if the icon is a Lucide Component or an Image Path String
            const IconComponent = typeof item.icon !== 'string' ? item.icon : null;

            return (
              <div key={item.label} className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start">
                {/* Icon Box */}
                <div className="flex h-[52px] w-[52px] sm:h-[72px] sm:w-[72px] items-center justify-center rounded-[8px] sm:rounded-[10px] bg-[#D9D9D9] flex-shrink-0">
                  {IconComponent ? (
                    /* Render as React Component */
                    <IconComponent className="h-6 w-6 sm:h-9 sm:w-9 text-[#000080]" />
                  ) : (
                    /* Render as Image Tag */
                    <img
                      src={item.icon as string}
                      alt={item.label}
                      className="h-6 w-6 sm:h-9 sm:w-9 object-contain"
                    />
                  )}
                </div>

                {/* Text Area */}
                <div className="flex flex-col justify-center">
                  <span className="font-inter font-bold text-[18px] sm:text-[24px] lg:text-[26px] leading-tight text-[#000080]">
                    {item.value}
                  </span>
                  <span className="font-inter font-medium text-[12px] sm:text-[14px] lg:text-[15px] text-black mt-0.5">
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