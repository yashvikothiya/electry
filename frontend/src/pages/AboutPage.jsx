import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';
import factoryBg from '../assets/led_factory_background.png';
import bulbImg from '../assets/bulb.png';
import blog1 from '../assets/blue_house.png';
import blog2 from '../assets/battery_storage.png';
import blog3 from '../assets/blog3.png';


const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-title">
              About Us
              <span className="title-underline"></span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="about-main-section">
        <div className="container">
          <div className="about-content-grid">
            <div className="about-left">
              <span className="section-tag">ABOUT US</span>
              <h2 className="main-heading">Leading LED Lighting Manufacturer in India</h2>
            </div>
            <div className="about-right">
              <p>
                Savex Electricals (India) Pvt. Ltd., established in 2012, is a trusted manufacturer 
                of LED lighting solutions based in Gujarat, India. We specialize in designing and 
                manufacturing a wide range of indoor and outdoor LED lighting products that meet 
                modern lighting requirements.
              </p>
              <p>
                With a strong focus on quality, innovation, and energy efficiency, our products are 
                developed to deliver long-lasting performance for residential, commercial, and 
                industrial applications. As a <strong>100% Made in India company</strong>, we proudly 
                contribute to the nation's growing manufacturing ecosystem.
              </p>
            </div>
          </div>

          <div className="about-features-row">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="11" r="3" />
                  <path d="M12 8v6M10 11h4" />
                </svg>
              </div>
              <h3>Since 2012</h3>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3>In-House</h3>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h3>Quality Tested</h3>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M3 3h18v18H3z" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                  <path d="M15 21V9" />
                </svg>
              </div>
              <h3>B2B & OEM Supply</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="about-journey-section">
        <div className="container">
          <div className="journey-grid">
            <div className="journey-image-column">
              <div className="journey-image-wrapper">
                <img src="https://savexelectricals.com/wp-content/uploads/elementor/thumbs/IMG_20170829_130610-rioy9che3qctypluksdb92mw3o633iyo9uxt3u15as.webp" alt="SaveX Office" className="journey-main-img" />
                <div className="journey-overlay-card">
                  <h3>SaveX Electricals (I) Pvt. Ltd</h3>
                </div>
              </div>
            </div>
            
            <div className="journey-content-column">
              <h4 className="journey-subtitle">OUR JOURNEY</h4>
              <h2 className="journey-title">Our Journey Since 2012</h2>
              <div className="journey-description">
                <p>
                  Founded in 2012, Savex Electricals began with a clear vision to 
                  manufacture reliable and affordable LED lighting solutions for the 
                  Indian market. Over the years, we have expanded our product range, 
                  strengthened our manufacturing capabilities, and built long-term 
                  relationships with distributors, contractors, and OEM partners across India.
                </p>
                <p>
                  Our steady growth is driven by continuous improvement in product 
                  design, manufacturing processes, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="about-vision-mission">
        <div className="vision-part">
          <div className="vision-image-container">
            <img src={bulbImg} alt="Innovation Bulb" />
          </div>
          <div className="vision-content">
            <span className="part-tag">VISION & MISSION</span>
            <h2 className="part-title">Our Vision</h2>
            <p className="part-text">
              To become a preferred LED lighting manufacturing brand in India by 
              delivering innovative, energy-efficient, and high-quality lighting 
              solutions that enhance everyday living and commercial spaces.
            </p>
          </div>
        </div>

        <div className="mission-part">
          <div className="container">
            <div className="mission-content">
              <span className="part-tag">VISION & MISSION</span>
              <h2 className="part-title">Our Mission</h2>
              <ul className="mission-list">
                <li>To manufacture reliable LED lighting products using advanced technology</li>
                <li>To maintain strict quality standards at every production stage</li>
                <li>To offer value-driven solutions for retail, B2B, and OEM customers</li>
                <li>To support sustainable and energy-efficient lighting practices</li>
              </ul>
            </div>
          </div>
          
          {/* Decorative graphic element (Simulated) */}
          <div className="mission-graphic"></div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="about-cta-banner">
        <div className="container">
          <div className="cta-banner-content">
            <h2>Looking for a reliable LED manufacturing partner?</h2>
            <button className="cta-btn">Contact Us</button>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="about-blog-section">
        <div className="container">
          <div className="blog-header">
            <h4 className="blog-subtitle">READ OUR BLOG</h4>
            <h2 className="blog-main-title">Latest News</h2>
          </div>
          
          <div className="about-blog-grid">
            <div className="about-blog-card">
              <div className="about-blog-image">
                <img src={blog1} alt="Solar Panels" />
                <div className="about-blog-date">
                  <span className="date-day">12</span>
                  <span className="date-month">APR</span>
                </div>
              </div>
              <div className="about-blog-info">
                <div className="about-blog-meta">
                  <span className="meta-category">ENERGY</span>
                  <span className="meta-divider">•</span>
                  <span className="meta-comments">0 Comments</span>
                </div>
                <h3 className="about-blog-title">How many solar panels do you need?</h3>
              </div>
            </div>

            <div className="about-blog-card">
              <div className="about-blog-image">
                <img src={blog2} alt="Battery Storage" />
                <div className="about-blog-date">
                  <span className="date-day">12</span>
                  <span className="date-month">APR</span>
                </div>
              </div>
              <div className="about-blog-info">
                <div className="about-blog-meta">
                  <span className="meta-category">ENERGY</span>
                  <span className="meta-divider">•</span>
                  <span className="meta-comments">0 Comments</span>
                </div>
                <h3 className="about-blog-title">What are the profits of solar energy?</h3>
              </div>
            </div>

            <div className="about-blog-card">
              <div className="about-blog-image">
                <img src={blog3} alt="Energy Tips" />
                <div className="about-blog-date">
                  <span className="date-day">12</span>
                  <span className="date-month">APR</span>
                </div>
              </div>
              <div className="about-blog-info">
                <div className="about-blog-meta">
                  <span className="meta-category">ENERGY</span>
                  <span className="meta-divider">•</span>
                  <span className="meta-comments">0 Comments</span>
                </div>
                <h3 className="about-blog-title">Tips to reduce your home’s energy use</h3>
              </div>
            </div>
          </div>
          <div className="about-blog-footer">
            <Link to="/blog" className="about-view-more-btn">View More</Link>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutPage;
