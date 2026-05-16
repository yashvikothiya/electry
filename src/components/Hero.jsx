import React from 'react';
import './Hero.css';
import bulbImg from '../assets/bulb.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-text">SAVEX</div>
      
      <div className="container hero-container">
        <div className="hero-main-content">
          <div className="hero-title-wrapper">
            <h1 className="hero-title">
              <span className="green-text">LED LIGHTING</span>
              <br />
              <span className="red-text">MANUFACTURER</span>
              <span className="green-text"> IN</span>
              <br />
              <span className="green-text">INDIA</span>
            </h1>
          </div>

          <div className="hero-footer-content">
            <p className="hero-subtitle">
              100% Made In India LED lighting solutions for <br />
              indoor & outdoor applications since 2012
            </p>
            
            <div className="bulb-section-wrapper">
              <button className="inquire-btn">INQUIRE NOW</button>
              
              <div className="bulb-display-area">
                <div className="arch-border"></div>
                <div className="hero-bulb-wrapper">
                  <img src={bulbImg} alt="LED Bulb" className="hero-bulb" />
                </div>
              </div>

              <div className="feature-grid">
                {/* Left Side */}
                <div className="feature-column left">
                  <div className="feature-card">
                    <div className="card-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <p className="card-text">SINCE 2012</p>
                    <div className="card-red-border"></div>
                  </div>
                  <div className="feature-card">
                    <div className="card-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" opacity="0.3"/>
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="4" fontWeight="bold">INDIA</text>
                      </svg>
                    </div>
                    <p className="card-text">MADE IN INDIA</p>
                    <div className="card-red-border"></div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="feature-column right">
                  <div className="feature-card">
                    <div className="card-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    </div>
                    <p className="card-text">QUALITY TESTED</p>
                    <div className="card-red-border"></div>
                  </div>
                  <div className="feature-card">
                    <div className="card-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
                      </svg>
                    </div>
                    <p className="card-text">B2B & OEM SUPPLY</p>
                    <div className="card-red-border"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
