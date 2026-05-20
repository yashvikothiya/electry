import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top-line"></div>
      <div className="container footer-content">
        <div className="footer-top-links">
          <div className="footer-logo">
            <img src="/src/assets/logo.png" alt="SAVEX" className="footer-logo-img" />
          </div>
          <nav className="footer-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/our-team">Team</Link></li>
              <li><Link to="/contact">Contacts</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-divider-main"></div>

        <div className="footer-middle">
          <div className="footer-col address-col">
            <p className="col-label">Office & Factory —</p>
            <p>16-17-18, Krishna Industrial Park,</p>
            <p>Saniya Hemad, Gujarat 395013</p>
          </div>
          
          <div className="footer-col contact-col">
            <p className="phone">+91 72650 11113</p>
            <p className="email">Sales@savexelectricals.com</p>
          </div>

          <div className="footer-col whatsapp-col">
            <p className="whatsapp-label">Get Daily Products Update</p>
            <p className="whatsapp-link">Just Whatsapp</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="copyright">
              SaveX Electricals © 2026. All Rights Reserved. Developed By <strong>Scolus Infotech</strong>
            </p>
          </div>
          <div className="footer-socials">
            <a href="#" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7h-2.54v-2.9h2.54v-2.21c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7c4.78-.75 8.44-4.9 8.44-9.9 0-5.53-4.5-10.02-10-10.02z"/>
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
