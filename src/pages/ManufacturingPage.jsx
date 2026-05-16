import React, { useEffect } from 'react';
import './ManufacturingPage.css';
import factoryInterior from '../assets/led_factory_background.png';


const ManufacturingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="manufacturing-page">
      {/* Banner Section */}
      <section className="manufacturing-hero">
        <div className="container">
          <div className="manufacturing-hero-content">
            <h1 className="manufacturing-title">
              Manufacturing & Quality
              <span className="title-underline"></span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="manufacturing-main-section">
        <div className="container">
          <div className="manufacturing-grid">
            <div className="manufacturing-image-col">
              <div className="image-wrapper">
                <img src="https://savexelectricals.com/wp-content/uploads/elementor/thumbs/59e470b2-ce1c-4b1a-8351-1a79642434b7-rioy9che3qctypluksdb92mw3o633iyo9uxt3u15as.jpg" alt="Manufacturing Floor" />
                <div className="image-overlay-card">
                  <h3>SaveX Electricals (I) Pvt. Ltd</h3>
                </div>
              </div>
            </div>
            
            <div className="manufacturing-content-col">
              <span className="section-tag">MANUFACTURING & QUALITY</span>
              <h2 className="section-title">Reliable LED Manufacturing Backed by Quality & Precision</h2>
              <div className="section-desc">
                <p>
                  Savex Electricals (India) Pvt. Ltd. is equipped with a modern 
                  manufacturing facility dedicated to producing high-performance LED 
                  lighting products. Since our establishment in 2012, we have focused on 
                  building strong in-house manufacturing capabilities supported by 
                  strict quality control processes.
                </p>
                <p>
                  Our infrastructure, skilled workforce, and standardized procedures 
                  enable us to deliver consistent, durable, and energy-efficient LED 
                  lighting solutions for indoor and outdoor applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Make in India Section */}
      <section className="make-in-india-section">
        <div className="container">
          <div className="mii-grid">
            <div className="mii-content-col">
              <span className="section-tag">PROUDLY SUPPORTING INDIAN MANUFACTURING</span>
              <h2 className="section-title">COMMITMENT TO "MAKE IN INDIA"</h2>
              <div className="section-desc">
                <p>
                  As a 100% Made in India LED manufacturer, we are committed to 
                  strengthening local manufacturing and delivering quality lighting 
                  products designed for Indian conditions.
                </p>
                <p>
                  Our focus on domestic production allows better quality control, faster 
                  support, and dependable supply.
                </p>
              </div>
            </div>
            
            <div className="mii-images-col">
              <div className="mii-image-card">
                <img src="https://savexelectricals.com/wp-content/uploads/2026/02/make-in-india-a-l2016021377308.avif" alt="Make in India" />
              </div>
              <div className="mii-image-card">
                <img src="https://savexelectricals.com/wp-content/uploads/elementor/thumbs/flag-india_23-2147813734-e1770024162725-rioy9chgs7mve71predxrlzncpln0aa1yfsfk2mgow.avif" alt="Indian Flag" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-House Production Setup Section */}
      <section className="manufacturing-main-section advanced-setup">
        <div className="container">
          <div className="manufacturing-grid">
            <div className="manufacturing-image-col">
              <div className="image-wrapper">
                <img src="https://savexelectricals.com/wp-content/uploads/elementor/thumbs/59e470b2-ce1c-4b1a-8351-1a79642434b7-rioy9che3qctypluksdb92mw3o633iyo9uxt3u15as.jpg" alt="Production Floor" />
              </div>
            </div>
            
            <div className="manufacturing-content-col">
              <span className="section-tag">ADVANCED</span>
              <h2 className="section-title">In-House Production Setup</h2>
              <div className="section-desc">
                <p>
                  Our manufacturing unit is designed to support end-to-end LED production, 
                  allowing us to maintain complete control over quality, performance, and 
                  timelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="manufacturing-main-section key-highlights">
        <div className="container">
          <div className="manufacturing-grid reverse-grid">
            <div className="manufacturing-content-col">
              <span className="section-tag">IN HOUSE FACILITY</span>
              <h2 className="section-title">Key Highlights</h2>
              <ul className="highlights-list">
                <li>Dedicated LED assembly lines</li>
                <li>Controlled production environment</li>
                <li>Skilled technical and assembly team</li>
                <li>Scalable capacity for bulk and OEM orders</li>
              </ul>
            </div>
            
            <div className="manufacturing-image-col">
              <div className="image-wrapper">
                <img src="https://savexelectricals.com/wp-content/uploads/elementor/thumbs/926256e2-4c8e-4fc5-be49-5de003754c2a-scaled-rioy9chffyzdhprdq6vyjkm27czj6k5rqf5cedxnx0.jpg" alt="Assembly Line" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Video Section */}
      <section className="manufacturing-main-section factory-video-section">
        <div className="video-container">
          <img src="https://savexelectricals.com/wp-content/uploads/2026/02/Untitled-design-2_page-0001-scaled.jpg" alt="Factory Video" />
          <div className="play-button">
            <div className="play-circle">
              <span>PLAY</span>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ManufacturingPage;
