import React from 'react';
import './TrustHighlights.css';

const TrustHighlights = () => {
  const highlights = [
    {
      id: 1,
      text: "Since 2012",
      icon: (
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 30V75C20 83.2843 26.7157 90 35 90H65C73.2843 90 80 83.2843 80 75V30H20Z" fill="white" stroke="#E31E24" strokeWidth="4"/>
          <path d="M20 30V15C20 12.2386 22.2386 10 25 10H75C77.7614 10 80 12.2386 80 15V30H20Z" fill="#E31E24"/>
          <rect x="30" y="38" width="40" height="40" rx="20" fill="#E31E24"/>
          <text x="50" y="65" textAnchor="middle" fontSize="24" fontWeight="900" fill="white" fontFamily="Arial">S</text>
          <path d="M25 20H75" stroke="white" strokeWidth="2" strokeDasharray="4 4"/>
        </svg>
      )
    },
    {
      id: 2,
      text: "Made In India",
      icon: (
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#E31E24" strokeWidth="3"/>
          <circle cx="50" cy="50" r="38" stroke="#E31E24" strokeWidth="1" strokeDasharray="4 2"/>
          <path d="M15 40H85V60H15V40Z" fill="#E31E24"/>
          <text x="50" y="54" textAnchor="middle" fontSize="12" fontWeight="900" fill="white" fontFamily="Arial">INDIA</text>
          <text x="50" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#E31E24" fontFamily="Arial">MADE IN</text>
          <text x="50" y="75" textAnchor="middle" fontSize="8" fontWeight="700" fill="#E31E24" fontFamily="Arial">MADE IN</text>
        </svg>
      )
    },
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
