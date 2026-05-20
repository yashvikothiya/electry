import React from 'react';
import './DetailSection.css';
import detailImg from '../assets/detail.png';

const DetailSection = () => {
  return (
    <section className="detail-section">
      <div className="container detail-container">
        <div className="detail-grid">
          <div className="detail-image-wrapper">
            <img src={detailImg} alt="Reliable Manufacturing" className="detail-img" />
          </div>
          <div className="detail-content">
            <h4 className="detail-subtitle">MANUFACTURING & QUALITY</h4>
            <h2 className="detail-title">Reliable LED Manufacturing</h2>
            <p className="detail-text">
              Our state-of-the-art manufacturing facilities are equipped with the latest technology 
              to ensure the highest quality LED lighting solutions. We prioritize precision, 
              durability, and energy efficiency in every product we create.
            </p>
            <div className="detail-stats">
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-label">Quality Check</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">24/7</span>
                <span className="stat-label">Production</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailSection;
