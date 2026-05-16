import React, { useEffect } from 'react';
import './ContactPage.css';


const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      {/* Banner Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="contact-title">
              Contacts
              <span className="title-underline"></span>
            </h1>
          </div>
        </div>
      </section>


      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Col: Info */}
            <div className="contact-info-col">
              <span className="section-tag">CONTACT OUR EXPERTS</span>
              <h2 className="section-title">Send Us Your Requirement</h2>
              <p className="section-subtitle">Get in Touch with Savex Electricals</p>
              
              <div className="address-block">
                <h4>Company Address :</h4>
                <p>
                  16-17-18, Krishna Industrial Park, Saniya Hemad, Gujarat – 395013<br />
                  India
                </p>
              </div>

              <div className="contact-links">
                <div className="contact-link-item">
                  <div className="link-icon-circle">
                    <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                    </svg>
                  </div>
                  <span className="link-text">+91 72650 11113</span>
                </div>
                
                <div className="contact-link-item">
                  <div className="link-icon-circle">
                    <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <span className="link-text">sales@savexelectricals.com</span>
                </div>
              </div>
            </div>

            {/* Right Col: Form Card */}
            <div className="contact-form-col">
              <div className="contact-card">
                <form className="contact-form">
                  <div className="form-group">
                    <div className="field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <input type="text" placeholder="Name" />
                  </div>
                  
                  <div className="form-group">
                    <div className="field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <input type="text" placeholder="Phone" />
                  </div>

                  <div className="form-group">
                    <div className="field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <input type="email" placeholder="Email Address" />
                  </div>

                  <div className="form-group">
                    <div className="field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <input type="text" placeholder="Subject" />
                  </div>

                  <div className="form-group">
                    <div className="field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </div>
                    <input type="text" placeholder="How can we help you? Feel free to get in touch!" />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18" style={{marginRight: '10px'}}>
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    Get In Touch
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ContactPage;
