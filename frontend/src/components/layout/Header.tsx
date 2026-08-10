// Path: frontend/src/components/layout/Header.tsx
// Site-wide header. Desktop shows the full nav inline; below the `lg`
// breakpoint it collapses into a hamburger button that opens a slide-down
// mobile menu. If you already have a header/navbar file elsewhere, merge
// the hamburger logic below into it rather than adding a second header.

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import blitzLogo from '../../assets/images/blitzlogo.png';
import logowrite from '../../assets/images/logowrite.png';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-16 sm:h-20 max-w-[1627px] items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* LOGO */}
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 flex-shrink-0">
          <img
            src={blitzLogo}
            alt="Blitz Paints"
            className="h-16 w-16 sm:h-20 sm:w-20 md:h-[80px] md:w-[80px] object-contain transition-all"
          />
          <img
            src={logowrite}
            alt="Blitz Paints"
            className="h-16 w-auto sm:h-20 md:h-[65px] object-contain transition-all"
          />
        </Link>
        {/* DESKTOP NAV - hidden below lg */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-inter text-[16px] font-medium transition-colors ${isActive ? 'text-[#000080] font-bold' : 'text-black/70 hover:text-[#000080]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP CONTACT BUTTON */}
        <Link
          to="/contact"
          className="hidden lg:flex items-center justify-center rounded-[8px] bg-[#000080] px-6 py-2.5 font-inter font-bold text-[15px] text-white transition-colors hover:bg-[#000066]"
        >
          Contact Us
        </Link>

        {/* HAMBURGER BUTTON - visible below lg only */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 items-center justify-center text-[#000080] lg:hidden"
        >
          <FiMenu size={28} />
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-in panel */}
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
              <img src={blitzLogo} alt="Blitz Paints" className="h-9 w-9 object-contain" />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 items-center justify-center text-[#000080]"
              >
                <IoClose size={26} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-4 py-6 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-[8px] px-4 py-3 font-inter text-[17px] font-medium transition-colors ${isActive ? 'bg-[#000080]/5 text-[#000080] font-bold' : 'text-black/70 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto px-4 pb-6">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-[8px] bg-[#000080] py-3 font-inter font-bold text-[16px] text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}