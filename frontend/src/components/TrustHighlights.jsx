import React from 'react';
import './TrustHighlights.css';

const TrustHighlights = () => {
  const highlights = [
    {
      id: 3,
      text: "In-House Manufacturing",
      icon: (
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 45L50 15L85 45V85H15V45Z" fill="#E31E24"/>
          <rect x="40" y="55" width="20" height="30" fill="white"/>
        </svg>
      )
    },
    {
      id: 4,
      text: "Quality Tested",
      icon: (
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="40" r="30" stroke="#E31E24" strokeWidth="4" fill="white"/>
          <circle cx="50" cy="40" r="22" stroke="#E31E24" strokeWidth="2"/>
          <path d="M40 65L30 90L50 80L70 90L60 65" fill="#E31E24"/>
          <circle cx="50" cy="40" r="10" fill="#E31E24"/>
        </svg>
      )
    },
    {
      id: 5,
      text: "B2B & OEM Supply",
      icon: (
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 40H90V85H10V40Z" fill="white" stroke="#E31E24" strokeWidth="4"/>
          <path d="M5 40L15 20H85L95 40H5Z" fill="#E31E24"/>
          <rect x="40" y="55" width="20" height="30" fill="#E31E24"/>
          <rect x="20" y="50" width="15" height="15" fill="#E31E24"/>
          <rect x="65" y="50" width="15" height="15" fill="#E31E24"/>
        </svg>
      )
    }
  ];

  return (
    <section className="trust-highlights">
      <div className="container">
        <div className="highlights-grid">
          {highlights.map((item) => (
            <div key={item.id} className="highlight-item">
              <div className="highlight-icon">
                {item.icon}
              </div>
              <h3 className="highlight-text">{item.text}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustHighlights;
