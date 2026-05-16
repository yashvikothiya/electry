import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: 1,
      title: 'Renewable Source',
      description: 'Consectetur adipiscing elit, sed do eiusm od tempor incididunt ut labore.',
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#8BC34A" strokeWidth="2">
          <circle cx="50" cy="50" r="22" />
          <path d="M50 28 L50 50 L35 65" />
          <path d="M50 50 L65 35" />
          <path d="M50 50 L65 65" />
          <path d="M30 45 L50 50 L45 30" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Easy Installation',
      description: 'Consectetur adipiscing elit, sed do eiusm od tempor incididunt ut labore.',
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#8BC34A" strokeWidth="2">
          <path d="M30 80 L50 20 L70 80" />
          <path d="M35 65 L65 65" />
          <path d="M40 50 L60 50" />
          <path d="M45 35 L55 35" />
          <path d="M50 20 L50 10" />
          <path d="M30 80 L20 85" />
          <path d="M70 80 L80 85" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Low Maintenance',
      description: 'Consectetur adipiscing elit, sed do eiusm od tempor incididunt ut labore.',
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#8BC34A" strokeWidth="2">
          <rect x="35" y="30" width="30" height="50" rx="5" />
          <path d="M45 30 V25 H55 V30" />
          <path d="M50 45 Q55 50 50 55 Q45 50 50 45 Z" fill="#8BC34A" />
          <path d="M50 55 V60" />
        </svg>
      )
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <h1 className="services-title">
              Our Services
              <span className="title-underline"></span>
            </h1>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <div className="service-card-arrow">
                  <span className="read-more-text">Read More</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10271D" strokeWidth="1.5">
                    <path d="M5 12h14M13 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="services-faq-section">
        <div className="container">
          <div className="faq-flex">
            <div className="faq-image-wrapper">
              <img 
                src="https://savexelectricals.com/wp-content/uploads/elementor/thumbs/service-page-image1-rioy9che3qctypluksdb92mw3o633iyo9uxt3u15as.jpg" 
                alt="Green Power" 
                className="faq-main-img" 
              />
              <div className="faq-floating-card">
                <h3>Performance, Quality and Reliability</h3>
              </div>
            </div>

            <div className="faq-content">
              <span className="faq-label">FAQ</span>
              <h2 className="faq-heading">How Does Green Power Work?</h2>
              
              <div className="accordion">
                <div className="accordion-item active">
                  <div className="accordion-header">
                    <span>What is a wind turbine?</span>
                    <span className="accordion-icon">-</span>
                  </div>
                  <div className="accordion-body">
                    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="accordion-header">
                    <span>Are wind turbines noisy?</span>
                    <span className="accordion-icon">+</span>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="accordion-header">
                    <span>How popular are wind farms?</span>
                    <span className="accordion-icon">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="services-clients-section">
        <div className="container">
          <div className="clients-flex">
            <div className="clients-logos">
              <img src="https://savexelectricals.com/wp-content/uploads/2023/01/clients-logo-dark-1.png" alt="Client 1" className="client-logo" />
              <img src="https://savexelectricals.com/wp-content/uploads/2023/01/clients-logo-dark-2.png" alt="Client 2" className="client-logo" />
              <img src="https://savexelectricals.com/wp-content/uploads/2023/01/clients-logo-dark-6.png" alt="Client 3" className="client-logo" />
              <img src="https://savexelectricals.com/wp-content/uploads/2023/01/clients-logo-dark-3.png" alt="Client 4" className="client-logo" />
            </div>
            <div className="clients-text">
              <h2 className="clients-heading">We Work with the<br />Best Brands</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner Section */}
      <section className="services-bottom-banner">
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-label">WHERE TO START</span>
            <h2 className="banner-heading">Find a Partner for Your<br />Wind Project</h2>
            <Link to="/contact" className="banner-btn">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* Modern Technologies Section */}
      <section className="modern-tech-section">
        <div className="container">
          <div className="tech-flex">
            <div className="tech-left">
              <span className="tech-label">MODERN TECHNOLOGIES</span>
              <h2 className="tech-heading">Leading Solar Panels<br />in the Industry</h2>
              <p className="tech-subtext">
                Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia.
              </p>
              
              <div className="tech-profile">
                <img 
                  src="https://savexelectricals.com/wp-content/uploads/2020/04/team-image2-300x300.jpg" 
                  alt="Piter Bowman" 
                  className="profile-img" 
                />
                <div className="profile-info">
                  <h4 className="profile-name">Piter Bowman</h4>
                  <span className="profile-title">Engineer</span>
                </div>
              </div>
            </div>

            <div className="tech-right">
              <div className="tech-right-col">
                <div className="quote-block">
                  <div className="quote-icon">Q</div>
                  <p className="quote-text">
                    nsectetur adipiscing elit, sed do eiusm onsectetur adipiscing elit, eiusm od tempor ut labore.
                  </p>
                </div>
                <p className="tech-para">
                  Consectetur adipiscing elit, sed do eiusm onsectetur adipiscing elit, sed do eiusm od tempor ut labore sed adipiscing do eiusm od tempor.
                </p>
              </div>

              <div className="tech-right-col">
                <p className="tech-para">
                  Consectetur adipiscing elit, sed do eiusm onsectetur adipiscing elit, sed do od tempor ut labore.
                </p>
                <p className="tech-para">
                  Consectetur adipiscing elit, sed do eiusm onsectetur adipiscing elit, sed do eiusm od tempor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Section */}
      <section className="maintenance-section">
        <div className="container">
          <div className="maintenance-grid">
            <div className="maintenance-card">
              <div className="m-card-image">
                <img src="https://savexelectricals.com/wp-content/uploads/2022/11/solar-solutions-service1-840x942.jpg" alt="Panel Cleaning" />
                <div className="m-card-overlay">
                  <span className="m-card-number">01.</span>
                  <div className="m-card-info">
                    <span className="m-card-subtext">Consectetur adipiscing</span>
                    <h3 className="m-card-title">Panel Cleaning</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="maintenance-card">
              <div className="m-card-image">
                <img src="https://savexelectricals.com/wp-content/uploads/2022/11/solar-solutions-service2-840x942.jpg" alt="Maintenance" />
                <div className="m-card-overlay">
                  <span className="m-card-number">02.</span>
                  <div className="m-card-info">
                    <span className="m-card-subtext">Consectetur adipiscing</span>
                    <h3 className="m-card-title">Maintenance</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="maintenance-card">
              <div className="m-card-image">
                <img src="https://savexelectricals.com/wp-content/uploads/2022/11/solar-solutions-service3-840x942.jpg" alt="Calibration" />
                <div className="m-card-overlay">
                  <span className="m-card-number">03.</span>
                  <div className="m-card-info">
                    <span className="m-card-subtext">Consectetur adipiscing</span>
                    <h3 className="m-card-title">Calibration</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
