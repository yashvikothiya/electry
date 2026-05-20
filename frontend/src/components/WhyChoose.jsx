import React from 'react';
import './WhyChoose.css';

const WhyChoose = () => {
  const cards = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L4 9v12h16V9l-8-6zm2 16h-4v-6h4v6z"/>
        </svg>
      ),
      text: (
        <>
          In-<br />House<br />Manufa<br />cturing
        </>
      ),
      color: "black"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 22l2-10-3-2 3-8h4l3 8-3 2 2 10M12 2v20 M16 7h-8 M14 12h-4 M13 17h-2"/>
        </svg>
      ),
      text: (
        <>
          Energy<br />Effcient<br />Product<br />s
        </>
      ),
      color: "black"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="5" height="5"/>
          <rect x="9.5" y="3" width="5" height="5"/>
          <rect x="16" y="3" width="5" height="5"/>
          <rect x="3" y="9.5" width="5" height="5"/>
          <rect x="9.5" y="9.5" width="5" height="5"/>
          <rect x="16" y="9.5" width="5" height="5"/>
          <rect x="3" y="16" width="5" height="5"/>
          <rect x="9.5" y="16" width="5" height="5"/>
          <rect x="16" y="16" width="5" height="5"/>
        </svg>
      ),
      text: (
        <>
          Wide<br />Product<br />Range
        </>
      ),
      color: "black"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="6" width="20" height="12" rx="2" transform="rotate(-30 12 12)"/>
          <circle cx="12" cy="12" r="3" transform="rotate(-30 12 12)"/>
          <path d="M7 12h.01M17 12h.01" transform="rotate(-30 12 12)"/>
        </svg>
      ),
      text: (
        <>
          Compet<br />itive<br />Pricing
        </>
      ),
      color: "black",
      hoverClass: "hover-red"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 8h16M4 16h16M8 5v6M16 5v6M12 13v6M6 13v6M18 13v6"/>
        </svg>
      ),
      text: (
        <>
          Quality<br />Control
        </>
      ),
      color: "black"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" fill="none"/>
        </svg>
      ),
      text: (
        <>
          Bulk<br />Order<br />Capabili<br />ty
        </>
      ),
      color: "black"
    }
  ];

  return (
    <section className="why-choose-section">
      <div className="container">
        <div className="why-header">
          <div className="why-title-group">
            <h4 className="why-subtitle">WHY CHOOSE</h4>
            <h2 className="why-main-title">SaveX</h2>
          </div>
          <p className="why-header-text">
            100% Made in India LED lighting solutions for <br />
            indoor & outdoor applications since 2012.
          </p>
        </div>

        <div className="why-cards-grid">
          {cards.map((card, index) => (
            <div className={`why-card ${card.hoverClass || ''}`} key={index}>
              <div className={`why-card-icon ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="why-card-text">{card.text}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
