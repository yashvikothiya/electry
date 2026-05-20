import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import WhyChoose from './components/WhyChoose';
import ManufacturingSection from './components/ManufacturingSection';
import FactoryCTA from './components/FactoryCTA';
import BlogSection from './components/BlogSection';

import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

import AboutPage from './pages/AboutPage';
import WhySaveXPage from './pages/WhySaveXPage';
import ManufacturingPage from './pages/ManufacturingPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import BlogPostPage from './pages/BlogPostPage';
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/CategoryPage';
import ProductsPage from './pages/ProductsPage';
import TagPage from './pages/TagPage';

const HomePage = () => (
  <main>
    <Hero />
    <AboutSection />
    <WhyChoose />
    <ManufacturingSection />
    <FactoryCTA />
    <BlogSection />
  </main>
);

function App() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hideGlobalSections = location.pathname === '/services' || location.pathname === '/our-team' || location.pathname === '/why-savex' || location.pathname.startsWith('/blog-post/') || ['/blog', '/blog/'].includes(location.pathname);

  return (
    <div className="app-wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/tag/:tagName" element={<TagPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/why-savex" element={<WhySaveXPage />} />
        <Route path="/manufacturing" element={<ManufacturingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/our-team" element={<TeamPage />} />
        <Route path="/blog-post/:id" element={<BlogPostPage />} />
      </Routes>
      
      {!hideGlobalSections && (
        <>

          <ContactCTA />
        </>
      )}
      
      <Footer />

      {showScrollBtn && (
        <button className="global-scroll-top" onClick={scrollToTop}>
          <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
