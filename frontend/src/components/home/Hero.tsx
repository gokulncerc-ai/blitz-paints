import React from 'react';
import { Link } from 'react-router-dom';

// Model & Hero Badge Assets
import ModelPreview from '../../assets/images/modelpreview.png';
import guardIcon from '../../assets/images/home/guard.png';
import sunIcon from '../../assets/images/home/sun.png';
import ecoIcon from '../../assets/images/home/eco.png';
import isoIcon from '../../assets/images/home/iso.png';

// Stat Card Icons
import homeIcon from '../../assets/images/home/home.png';
import contractorIcon from '../../assets/images/home/contractor.png';
import productsIcon from '../../assets/images/home/product.png';
import badgeIcon from '../../assets/images/home/badge.png';

const STATS = [
  { value: '5000+', label: 'Happy Homes', icon: homeIcon },
  { value: '300+', label: 'Contractors', icon: contractorIcon },
  { value: '120+', label: 'Products', icon: productsIcon },
  { value: '25+', label: 'Years Of Trust', icon: badgeIcon },
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

          {/* TAGLINE */}
          <h3 className="font-inter font-bold text-[18px] sm:text-[24px] leading-none text-[#2E1B66] mb-3 sm:mb-4">
            Engineered Paint & Construction Solutions
          </h3>

          {/* MAIN HEADING */}
          <h1 className="font-inter font-bold text-[28px] sm:text-[36px] lg:text-[48px] leading-[110%] lg:leading-[105%] text-black mb-4 sm:mb-6 max-w-[513px]">
            Transforming Spaces <br />
            With <span className="text-[#000080]">High Durability</span> <br />
            Coatings
          </h1>

          {/* SUB-HEADLINE */}
          <p className="font-inter font-medium text-[16px] sm:text-[20px] lg:text-[24px] leading-[130%] lg:leading-[110%] text-black mb-6 sm:mb-8 max-w-[450px]">
            Advanced Protection. Premium Finishes <br className="hidden sm:block" />
            Built For Kerala's Climate
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
          <div className="mt-4 lg:mt-[80px] w-full max-w-[749px] min-h-[103px] flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 border-t border-b border-gray-200/80 py-4 bg-white/40 backdrop-blur-xs rounded-lg px-2">
            {/* ITEM 1: EXPERIENCE */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={guardIcon} alt="Guard" className="h-9 sm:h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-inter font-medium text-[18px] sm:text-[24px] leading-none text-[#000080]">
                  25+
                </span>
                <span className="font-inter font-medium text-[13px] sm:text-[16px] leading-[110%] text-black mt-1">
                  Years Of <br /> Experience
                </span>
              </div>
            </div>

            {/* ITEM 2: WEATHER RESISTANT */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={sunIcon} alt="Weather" className="h-[48px] sm:h-[64px] w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-inter font-medium text-[18px] sm:text-[24px] leading-none text-[#000080]">
                  Weather
                </span>
                <span className="font-inter font-medium text-[13px] sm:text-[16px] leading-none text-black mt-1">
                  Resistant
                </span>
              </div>
            </div>

            {/* ITEM 3: ECO FRIENDLY */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={ecoIcon} alt="Eco" className="h-[48px] sm:h-[64px] w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-inter font-medium text-[18px] sm:text-[24px] leading-none text-[#000080]">
                  Eco
                </span>
                <span className="font-inter font-medium text-[13px] sm:text-[16px] leading-none text-black mt-1">
                  Friendly
                </span>
              </div>
            </div>

            {/* ITEM 4: ISO CERTIFIED */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={isoIcon} alt="ISO" className="h-[48px] sm:h-[64px] w-auto object-contain" />
              <div className="flex flex-col justify-center">
                <span className="font-inter font-medium text-[18px] sm:text-[24px] leading-none text-[#000080]">
                  ISO
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM STATS CARD */}
        <div className="mt-8 lg:mt-[60px] mx-auto w-full max-w-[1627px] min-h-[146px] rounded-[10px] bg-white p-4 sm:p-6 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          {STATS.map((item) => (
            <div key={item.label} className="flex items-center gap-3 sm:gap-5">
              {/* Icon Box */}
              <div className="flex h-[64px] w-[64px] sm:h-[100px] sm:w-[100px] items-center justify-center rounded-[10px] sm:rounded-[12px] bg-[#D9D9D9] flex-shrink-0">
                <img src={item.icon} alt={item.label} className="h-8 w-8 sm:h-12 sm:w-12 object-contain" />
              </div>

              {/* Text Area */}
              <div className="flex flex-col justify-center">
                <span className="font-inter font-bold text-[22px] sm:text-[32px] lg:text-[40px] leading-none text-[#000080]">
                  {item.value}
                </span>
                <span className="font-inter font-medium text-[13px] sm:text-[16px] lg:text-[18px] text-black mt-1">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}