import React from 'react';
import { Link } from 'react-router-dom';
import './ManufacturingSection.css';

const ManufacturingSection = () => {
  return (
    <section className="mfg-section">
      <div className="container mfg-container">
        <div className="mfg-grid">
          <div className="mfg-images-column">
            <div className="mfg-bg-box"></div>
            <div className="mfg-image-wrapper">
              <img 
                src="https://savexelectricals.com/wp-content/uploads/elementor/thumbs/75f639fa-655f-4d44-bfeb-c865042daed0-rioy9chiz5lb8h039vnkibaaiaxhzsgyqz18amvd02.jpg" 
                alt="Manufacturing Unit 1" 
                className="mfg-img" 
              />
            </div>
            <div className="mfg-image-wrapper">
              <img 
                src="https://savexelectricals.com/wp-content/uploads/elementor/thumbs/59e470b2-ce1c-4b1a-8351-1a79642434b7-rioy9chiz5lb8h039vnkibaaiaxhzsgyqz18amvd02.jpg" 
                alt="Manufacturing Unit 2" 
                className="mfg-img" 
              />
            </div>
          </div>
          
          <div className="mfg-content-column">
            <h4 className="mfg-subtitle">OUR MANAUFACTFURING UNIT</h4>
            <h2 className="mfg-title">Manufacturing Preview</h2>
            <p className="mfg-description">
              Our manufacturing facility is equipped with modern 
              machinery, testing equipment, and quality control systems to 
              ensure long-lasting LED products
            </p>
            <Link to="/manufacturing" className="mfg-btn">Manufacturing & Quality</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingSection;
