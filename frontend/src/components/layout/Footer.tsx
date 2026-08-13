import { Link } from 'react-router-dom';
// ---footer logo----
import footerlogo from "../../assets/images/blitzlogo.png";

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Our Brand', to: '/about' },
      { label: 'Quality', to: '/about' },
      { label: 'Careers', to: '/about' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Interior Paints', to: '/products?type=interior_wall_coating' },
      { label: 'Exterior Paints', to: '/products?type=exterior_wall_coating' },
      { label: 'Water Proofing', to: '/products?type=waterproofing' },
      { label: 'Specialty Coatings', to: '/products?type=specialty_coating' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Painting Services', to: '/services' },
      { label: 'Waterproofing Solutions', to: '/services' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Gallery', to: '/projects' },
      { label: 'Blogs', to: '/blogs' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <img
              src={footerlogo}
              alt="footerlogo"
              className="h-14 w-14 rounded-full object-contain"
            />
          </div>
          <p className="text-sm text-white/70">
            <strong> Transforming Spaces With <br /> High Durability Coatings </strong>
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 font-semibold">{col.title}</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-3 font-semibold">Contact Us</h4>
          <p className="text-sm text-white/70">Blitz Paints Pvt Ltd, SIDCO Industrial Estate Kulappully, Shoranur,
            Palakkad (Dt)Kerala</p>
          <p className="mt-2 text-sm text-white/70"> +91 90723 53003</p>
          <p className="mt-2 text-sm text-white/70">marketing@blitzpaint.com</p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/60">
        Â© 2026 Blitz Paints. All Rights Reserved
      </div>
    </footer>
  );
}