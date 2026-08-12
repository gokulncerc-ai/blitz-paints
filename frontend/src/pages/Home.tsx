// Path: frontend/src/pages/Home.tsx
import Hero from '../components/home/Hero';
import ServiceCategoryCards from '../components/home/ServiceCategoryCards';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ColourStudio from '../components/home/ColourStudio';
import Transformations from '../components/home/Transformations';
import NewsSection from '../components/home/NewsSection';
import CTABanner from '../components/home/CTABanner';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <ServiceCategoryCards />
      <ColourStudio />
      <Transformations />
      <NewsSection />
      <CTABanner />
    </div>
  );
}
