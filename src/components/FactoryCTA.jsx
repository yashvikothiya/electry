import React from 'react';
import './FactoryCTA.css';
import { Link } from 'react-router-dom';

const FactoryCTA = () => {
  return (
    <section className="factory-cta">
      <img 
        src="https://savexelectricals.com/wp-content/uploads/2026/02/Untitled-design-2_page-0001-scaled.jpg" 
        alt="Factory Background" 
        className="factory-cta-bg-img"
      />
      <div className="factory-cta-overlay"></div>
      <div className="container factory-cta-container">
        <div className="factory-cta-content">
          <span className="cta-subtitle">LOOKING FOR</span>
          <h2 className="cta-main-title">Reliable LED Manufacturing Partner?</h2>
          <Link to="/contact" className="cta-contact-btn">
            Contact Us 
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FactoryCTA;
