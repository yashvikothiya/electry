import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo">
            <img src="/src/assets/logo.png" alt="SAVEX Logo" className="logo-img" />
          </Link>
          
          <ul className="nav-links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/about-us" className={location.pathname === '/about-us' ? 'active' : ''}>About Us</Link></li>
            <li><Link to="/products" className={location.pathname.includes('/products') ? 'active' : ''}>Products</Link></li>
            <li><Link to="/why-savex" className={location.pathname === '/why-savex' ? 'active' : ''}>Why SaveX</Link></li>
            <li><Link to="/manufacturing" className={location.pathname === '/manufacturing' ? 'active' : ''}>Manufacturing & Quality</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link></li>
          </ul>
          
          <div className="nav-actions">
            <button className="icon-btn search-trigger" aria-label="Search" onClick={toggleSearch}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="icon-btn menu-trigger" aria-label="Menu" onClick={toggleMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="4" height="4" rx="1"></rect>
                <rect x="10" y="3" width="4" height="4" rx="1"></rect>
                <rect x="17" y="3" width="4" height="4" rx="1"></rect>
                <rect x="3" y="10" width="4" height="4" rx="1"></rect>
                <rect x="10" y="10" width="4" height="4" rx="1"></rect>
                <rect x="17" y="10" width="4" height="4" rx="1"></rect>
                <rect x="3" y="17" width="4" height="4" rx="1"></rect>
                <rect x="10" y="17" width="4" height="4" rx="1"></rect>
                <rect x="17" y="17" width="4" height="4" rx="1"></rect>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Global Backdrop */}
      <div 
        className={`nav-backdrop ${(isSearchOpen || isMenuOpen) ? 'open' : ''}`} 
        onClick={() => { setIsSearchOpen(false); setIsMenuOpen(false); }}
      ></div>

      {/* Search Overlay */}
      <div className={`search-overlay ${isSearchOpen ? 'open' : ''}`}>
        <div className="search-overlay-header">
          <img src="/src/assets/logo.png" alt="SAVEX Logo" className="overlay-logo" />
          <button className="close-btn" onClick={toggleSearch}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="search-overlay-content">
          <div className="search-input-container">
            <div className="search-input-row">
              <input 
                type="text" 
                placeholder="Type words and hit enter" 
                className="search-field"
                autoFocus={isSearchOpen}
              />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="search-field-icon">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <div className="search-underline"></div>
          </div>
        </div>
      </div>

      {/* Side Menu Drawer */}
      <div className={`side-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <img src="/src/assets/logo.png" alt="SAVEX Logo" className="drawer-logo" />
          <button className="drawer-close" onClick={toggleMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="drawer-content">
          <div className="drawer-socials-wrapper">
            <div className="drawer-socials">
              <a href="#" className="drawer-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Facebook</span>
              </a>
              <a href="#" className="drawer-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <div className="drawer-bottom-group">
            <div className="drawer-divider"></div>
            <div className="drawer-contact">
              <a href="tel:+917265011113" className="drawer-contact-item phone">+91 72650 11113</a>
              <a href="mailto:sales@savexelectricals.com" className="drawer-contact-item email">sales@savexelectricals.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
