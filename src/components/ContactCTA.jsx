import React from 'react';
import './ContactCTA.css';

const ContactCTA = () => {
  return (
    <section className="contact-cta">
      <div className="container contact-cta-container">
        <div className="contact-cta-content">
          <h2 className="cta-title">
            Looking for a reliable LED manufacturing <span className="highlight">partner ?</span>
          </h2>
          <button className="cta-btn-ghost">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
