import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AboutImage from '../assets/images/images/about.png';

const PRODUCT_PORTFOLIO = [
  'Interior Wall Emulsions',
  'Exterior Wall Emulsions',
  'Premium Primers',
  'Waterproofing Solutions',
  'Roof & Tile Coatings',
  'Damp Proof Coatings',
  'Foundation Coats',
  'Specialty Protective Coatings',
];

const COMMITMENT_POINTS = [
  'Excellent coverage',
  'Long-lasting colour retention',
  'Superior weather resistance',
  'Low maintenance',
  'High durability',
  'Reliable protection',
];

const WHY_CHOOSE_US = [
  'Premium Quality Products',
  'Innovative Paint Technologies',
  'Eco-Friendly Manufacturing',
  'Durable Performance Coatings',
  'Wide Product Portfolio',
  'Trusted Technical Support',
  'Customer-Centric Service',
  'Reliable Distribution Network',
];

const STATS: [string, string][] = [
  ['25+', 'Years Of Trust'],
  ['5000+', 'Happy Homes'],
  ['300+', 'Contractors'],
  ['120+', 'Products'],
];

export default function About() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[300px] sm:min-h-[360px] w-full flex items-end overflow-hidden">
        {/* BACKGROUND IMAGE CONTAINER */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={AboutImage}
            alt="About Blitz Paints Background"
            className="w-full h-full object-cover object-center"
          />
          {/* LIGHT BOTTOM-ONLY GRADIENT - JUST ENOUGH FOR TEXT CONTRAST, IMAGE STAYS CLEARLY VISIBLE */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>

        {/* HERO CONTENT OVERLAY */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8 sm:pb-10 text-center w-full">
          <h1 className="font-inter font-bold text-[24px] sm:text-[30px] lg:text-[34px] leading-[120%] text-white mb-2 drop-shadow-md">
            About Blitz Paints
          </h1>
          <p className="font-inter text-[13px] sm:text-[15px] text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow">
            Protecting Surfaces. Enhancing Spaces. Inspiring Colours.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-14">
        {/* ABOUT US */}
        <section className="mb-14">
          <h2 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#000080] mb-4">
            About Us
          </h2>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600 mb-4">
            Blitz Paints Pvt. Ltd. is a trusted manufacturer of premium decorative paints and
            high-performance coating solutions. We are committed to delivering exceptional
            quality, sustainable products, and innovative technologies that enhance and protect
            every surface.
          </p>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600">
            With a strong focus on customer satisfaction, we serve residential, commercial,
            industrial, and infrastructure projects by offering reliable painting solutions that
            combine outstanding performance with long-lasting durability.
          </p>
        </section>

        {/* STATS */}
        <section className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(([value, label]) => (
            <div
              key={label}
              className="rounded-[16px] border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <p className="font-inter font-bold text-[32px] text-[#000080]">{value}</p>
              <p className="font-inter text-[14px] text-gray-500">{label}</p>
            </div>
          ))}
        </section>

        {/* WHO WE ARE */}
        <section className="mb-14">
          <h2 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#000080] mb-4">
            Who We Are
          </h2>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600 mb-4">
            At Blitz Paints, we believe that every surface deserves superior protection and a
            beautiful finish. Our expertise in decorative paints, primers, waterproofing
            products, roof coatings, and specialty coatings enables us to provide complete
            painting solutions for diverse applications.
          </p>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600">
            Our products are developed using advanced manufacturing processes and high-quality
            raw materials to ensure excellent coverage, durability, weather resistance, and
            aesthetic appeal.
          </p>
        </section>

        {/* PRODUCT PORTFOLIO */}
        <section className="mb-14">
          <h2 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#000080] mb-4">
            Our Product Portfolio
          </h2>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600 mb-6">
            Blitz Paints offers a comprehensive range of products designed to meet different
            customer requirements, including:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRODUCT_PORTFOLIO.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[10px] border border-gray-100 bg-white px-4 py-3 shadow-sm"
              >
                <span className="text-[#F86B06] font-bold">●</span>
                <span className="font-inter text-[15px] text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600 mt-6">
            Each product is carefully engineered to deliver superior performance, durability, and
            long-lasting protection.
          </p>
        </section>

        {/* OUR COMMITMENT */}
        <section className="mb-14">
          <h2 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#000080] mb-4">
            Our Commitment
          </h2>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600 mb-6">
            Quality is the foundation of everything we do. Every Blitz Paints product is
            developed to meet high performance standards while maintaining our commitment to
            sustainability and environmental responsibility. We continuously invest in innovation
            to provide products that deliver:
          </p>
          <div className="flex flex-wrap gap-3">
            {COMMITMENT_POINTS.map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#000080]/5 px-4 py-2 font-inter text-[14px] font-semibold text-[#000080]"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* CUSTOMER FIRST */}
        <section className="mb-14">
          <h2 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#000080] mb-4">
            Customer First
          </h2>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600 mb-4">
            Customer satisfaction remains our highest priority. From product selection to
            technical guidance and after-sales support, our experienced team works closely with
            customers, dealers, contractors, and project partners to ensure the right solutions
            for every application.
          </p>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600">
            Our efficient supply chain, dependable service, and technical expertise allow us to
            deliver a seamless customer experience.
          </p>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-14">
          <h2 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#000080] mb-4">
            Why Choose Blitz Paints?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[10px] border border-gray-100 bg-white px-4 py-3 shadow-sm"
              >
                <span className="text-[#F86B06] font-bold">✓</span>
                <span className="font-inter text-[15px] text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="mb-14 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[16px] bg-[#000080] p-8 text-white">
            <h3 className="font-inter font-bold text-[22px] mb-3">Our Vision</h3>
            <p className="font-inter text-[15px] leading-[170%] text-white/85">
              To become one of India's most trusted paint and coating manufacturers by delivering
              innovative, sustainable, and high-performance products that create beautiful,
              durable, and protected spaces.
            </p>
          </div>
          <div className="rounded-[16px] bg-[#F86B06] p-8 text-white">
            <h3 className="font-inter font-bold text-[22px] mb-3">Our Mission</h3>
            <p className="font-inter text-[15px] leading-[170%] text-white/85">
              To provide world-class decorative paints and coating solutions through continuous
              innovation, uncompromising quality, sustainable manufacturing, and exceptional
              customer service while building long-term relationships with customers and
              partners.
            </p>
          </div>
        </section>

        {/* BUILD WITH CONFIDENCE */}
        <section className="rounded-[16px] border border-gray-100 bg-white p-8 sm:p-10 text-center shadow-sm">
          <h2 className="font-inter font-bold text-[26px] sm:text-[30px] text-[#000080] mb-4">
            Build with Confidence
          </h2>
          <p className="font-inter text-[16px] leading-[170%] text-gray-600 max-w-3xl mx-auto mb-4">
            Whether you are painting a new home, renovating a commercial space, protecting
            industrial equipment, or enhancing architectural beauty, Blitz Paints delivers
            solutions that combine quality, performance, and lasting value.
          </p>
          <p className="font-inter font-bold text-[16px] text-[#000080]">
            Blitz Paints — Protecting Surfaces. Enhancing Spaces. Inspiring Colours.
          </p>
        </section>
      </div>
    </div>
  );
}