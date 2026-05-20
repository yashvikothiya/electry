import React from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container about-container">
        <div className="about-grid">
          <div className="about-image-column">
            <div className="about-image-wrapper">
              <img 
                src="https://savexelectricals.com/wp-content/uploads/elementor/thumbs/IMG_20170829_130610-rioy9che3qctypluksdb92mw3o633iyo9uxt3u15as.webp" 
                alt="SaveX Factory Building" 
                className="about-main-img" 
              />
              <div className="about-overlay-card">
                <h3>SaveX Electricals (I) Pvt. Ltd</h3>
              </div>
            </div>
          </div>
          
          <div className="about-content-column">
            <h4 className="about-subtitle">ABOUT US</h4>
            <h2 className="about-title">About SaveX</h2>
            <p className="about-description">
              Savex Electricals (India) Pvt. Ltd. is a leading LED lighting manufacturer 
              based in Gujarat, delivering reliable, energy-efficient lighting solutions 
              for residential, commercial, and industrial use.
            </p>
            <Link to="/about-us" className="read-more-btn">Read More</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
