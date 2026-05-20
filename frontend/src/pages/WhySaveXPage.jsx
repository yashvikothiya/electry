import React, { useEffect } from 'react';
import './WhySaveXPage.css';


const WhySaveXPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="why-savex-page">
      {/* Banner Section */}
      <section className="why-hero">
        <div className="container">
          <div className="why-hero-content">
            <h1 className="why-title">
              Why SaveX
              <span className="title-underline"></span>
            </h1>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="why-highlights">
        <div className="container">
          <div className="highlights-row">
            <div className="highlight-item">
              <div className="highlight-icon">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 10H85V70L50 90L15 70V10Z" stroke="#E31E24" stroke-width="4"/>
                  <circle cx="50" cy="45" r="15" stroke="#E31E24" stroke-width="4"/>
                  <text x="50" y="52" text-anchor="middle" font-size="18" font-weight="900" fill="#E31E24">S</text>
                  <rect x="25" y="20" width="50" height="4" fill="#E31E24"/>
                </svg>
              </div>
              <p>Since 2012</p>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="#E31E24" stroke-width="2" stroke-dasharray="4 2"/>
                  <rect x="10" y="40" width="80" height="20" rx="4" fill="#E31E24"/>
                  <text x="50" y="54" text-anchor="middle" font-size="12" font-weight="900" fill="white">INDIA</text>
                  <text x="50" y="35" text-anchor="middle" font-size="8" font-weight="900" fill="#E31E24">MADE IN</text>
                  <text x="50" y="70" text-anchor="middle" font-size="8" font-weight="900" fill="#E31E24">MADE IN</text>
                </svg>
              </div>
              <p>Made In India</p>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <svg viewBox="0 0 100 100" fill="#E31E24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 45L50 10L90 45V85H65V60H35V85H10V45Z"/>
                </svg>
              </div>
              <p>In-House Manufacturing</p>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="40" r="25" stroke="#E31E24" stroke-width="6"/>
                  <circle cx="50" cy="40" r="15" stroke="#E31E24" stroke-width="2"/>
                  <path d="M35 60L25 90L50 80L75 90L65 60" stroke="#E31E24" stroke-width="6" stroke-linejoin="round"/>
                </svg>
              </div>
              <p>Quality Tested</p>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 40L20 20H80L85 40" stroke="#E31E24" stroke-width="6" stroke-linecap="round"/>
                  <rect x="15" y="40" width="70" height="45" stroke="#E31E24" stroke-width="6"/>
                  <rect x="40" y="60" width="20" height="25" fill="#E31E24"/>
                  <path d="M10 40H90" stroke="#E31E24" stroke-width="6"/>
                </svg>
              </div>
              <p>B2B & OEM Supply</p>
            </div>
          </div>
        </div>
      </section>



      {/* Why Choose SaveX Section */}
      <section className="why-choose-grid-section">
        <div className="container">
          <div className="why-choose-header">
            <div className="header-left">
              <span className="choose-subtitle">WHY CHOOSE</span>
              <h2 className="choose-main-title">SaveX</h2>
            </div>
            <div className="header-right">
              <p className="choose-desc">
                100% Made in India LED lighting solutions for indoor & outdoor 
                applications since 2012.
              </p>
            </div>
          </div>

          <div className="choose-cards-grid">
            {/* Card 1 */}
            <div className="choose-card">
              <div className="choose-icon">
                <svg viewBox="0 0 24 24" fill="#10271D" width="40" height="40">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
              <h4>In-House Manufacturing</h4>
            </div>

            {/* Card 2 */}
            <div className="choose-card">
              <div className="choose-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#10271D" strokeWidth="2" width="40" height="40">
                  <path d="M12 2v20M5 7l7-5 7 5M5 17l7 5 7-5" />
                </svg>
              </div>
              <h4>Energy Efficient Products</h4>
            </div>

            {/* Card 3 */}
            <div className="choose-card">
              <div className="choose-icon">
                <svg viewBox="0 0 24 24" fill="#10271D" width="40" height="40">
                  <rect x="3" y="3" width="5" height="5" />
                  <rect x="11" y="3" width="5" height="5" />
                  <rect x="19" y="3" width="5" height="5" />
                  <rect x="3" y="11" width="5" height="5" />
                  <rect x="11" y="11" width="5" height="5" />
                  <rect x="19" y="11" width="5" height="5" />
                  <rect x="3" y="19" width="5" height="5" />
                  <rect x="11" y="19" width="5" height="5" />
                  <rect x="19" y="19" width="5" height="5" />
                </svg>
              </div>
              <h4>Wide Product Range</h4>
            </div>

            {/* Card 4 */}
            <div className="choose-card">
              <div className="choose-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#E31E24" strokeWidth="2" width="40" height="40">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                  <text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#E31E24" stroke="none">$</text>
                </svg>
              </div>
              <h4>Competitive Pricing</h4>
            </div>

            {/* Card 5 */}
            <div className="choose-card">
              <div className="choose-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#10271D" strokeWidth="2" width="40" height="40">
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                  <circle cx="8" cy="8" r="2" fill="#10271D" />
                  <circle cx="16" cy="16" r="2" fill="#10271D" />
                </svg>
              </div>
              <h4>Quality Control</h4>
            </div>

            {/* Card 6 */}
            <div className="choose-card">
              <div className="choose-icon">
                <svg viewBox="0 0 24 24" fill="#10271D" width="40" height="40">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 11 12 14 22 4" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h4>Bulk Order Capability</h4>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default WhySaveXPage;
