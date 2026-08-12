// Path: frontend/src/components/home/ServiceCategoryCards.tsx
// Static "quick access" cards shown on the homepage (Painting / Waterproofing / Tiles)
// These are intentionally not API-driven - they're navigation shortcuts, not managed content.

import { Link } from 'react-router-dom';

// Service Card Image Assets
import paintingIcon from '../../assets/images/home/paintingIcon.png';
import waterIcon from '../../assets/images/home/waterIcon.png';
import tileIcon from '../../assets/images/home/tileIcon.png';

const CARDS = [
  {
    title: 'Painting Services',
    desc: 'Premium Interior & Exterior application with flawless finish and long lasting beauty',
    bgColor: 'bg-[#E9D1C2]',
    iconBg: 'bg-[#F86B06]',
    linkColor: 'text-[#F86B06]',
    icon: paintingIcon,
    to: '/services',
  },
  {
    title: 'Water Proofing Solutions',
    desc: 'Advance Damp Protection for roofs, basements, and bathrooms',
    bgColor: 'bg-[#B3E0F6]',
    iconBg: 'bg-[#2091FA]',
    linkColor: 'text-[#2091FA]',
    icon: waterIcon,
    to: '/services',
  },
  {
    title: 'Flooring Solutions',
    desc: 'High Performance Tile adhesives, polymers and construction chemicals',
    bgColor: 'bg-[#E0E8D9]',
    iconBg: 'bg-[#408D16]',
    linkColor: 'text-[#408D16]',
    icon: tileIcon,
    to: '/services',
  },
];

export default function ServiceCategoryCards() {
  return (
    <section className="mx-auto my-10 w-full max-w-[1627px] px-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className={`relative flex h-auto w-full flex-col justify-between rounded-[10px] ${card.bgColor} p-6 sm:p-8 lg:h-[301px] transition-transform duration-300 hover:-translate-y-1`}
          >
            <div className="flex items-start gap-4 sm:gap-6">
              {/* ICON CONTAINER: 120px x 120px */}
              <div
                className={`flex h-[100px] w-[100px] flex-shrink-0 items-center justify-center rounded-[16px] ${card.iconBg} shadow-sm sm:h-[120px] sm:w-[120px]`}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                />
              </div>

              {/* CONTENT AREA */}
              <div className="flex flex-col">
                {/* HEADLINE */}
                <h3 className="mb-3 font-inter text-[20px] font-bold leading-[110%] text-black sm:text-[24px]">
                  {card.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="font-inter text-[16px] font-medium leading-[130%] text-black/90 sm:text-[18px]">
                  {card.desc}
                </p>
              </div>
            </div>

            {/* LEARN MORE LINK */}
            <div className="mt-6 flex justify-end lg:ml-[144px] lg:justify-start">
              <Link
                to={card.to}
                className={`flex items-center gap-2 font-inter text-[20px] font-bold leading-none ${card.linkColor} hover:underline sm:text-[24px]`}
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}