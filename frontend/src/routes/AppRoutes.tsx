// Path: frontend/src/routes/AppRoutes.tsx
// Central route table - add new pages here.

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Services from '../pages/Services';
import ServiceDetail from '../pages/ServiceDetail';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Colours from '../pages/Colours';
import Projects from '../pages/Projects';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/colours" element={<Colours />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<BlogDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
