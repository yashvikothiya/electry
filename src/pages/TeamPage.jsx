import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TeamPage.css';

const teamMembers = [
  {
    id: 1,
    name: 'Yashvi Sharma',
    role: 'CEO & Founder',
    image: 'https://savexelectricals.com/wp-content/uploads/2022/11/team-image1-570x696.jpg',
    desc: 'Passionate about revolutionary lighting solutions that transform spaces and save energy.'
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    role: 'Head of Design',
    image: 'https://savexelectricals.com/wp-content/uploads/2020/04/team-image4-570x696.jpg',
    desc: 'Expert in cinematic lighting design with over 15 years of experience in the industry.'
  },
  {
    id: 3,
    name: 'Sanya Iyer',
    role: 'Technical Director',
    image: 'https://savexelectricals.com/wp-content/uploads/2020/04/team-image2-570x696.jpg',
    desc: 'Ensures that every SAVEX product meets the highest standards of quality and performance.'
  },
  {
    id: 4,
    name: 'Rahul Varma',
    role: 'Production Manager',
    image: 'https://savexelectricals.com/wp-content/uploads/2020/04/team-image3-570x696.jpg',
    desc: 'Oversees our state-of-the-art manufacturing facility to deliver excellence at scale.'
  }
];

const blogPosts = [
  {
    id: 1,
    category: 'ENERGY',
    date: 'April 12, 2020',
    title: 'How many solar panels do you need?',
    summary: 'Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Curabitur vel dui et nisl.',
    link: '/blog-post-1'
  },
  {
    id: 2,
    category: 'ENERGY',
    date: 'April 12, 2020',
    title: 'What are the profits of solar energy?',
    summary: 'Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Pellentesque habitant morbi.',
    link: '#'
  },
  {
    id: 3,
    category: 'ENERGY',
    date: 'April 12, 2020',
    title: 'Tips to reduce your home\'s energy use',
    summary: 'Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Mauris placerat eleifend.',
    link: '#'
  },
  {
    id: 4,
    category: 'DESIGN',
    date: 'May 05, 2020',
    title: 'The Future of Smart Lighting',
    summary: 'Exploration of how smart technology is changing the way we interact with light in our homes.',
    link: '#'
  }
];

const TeamPage = () => {
  const [blogIndex, setBlogIndex] = useState(0);

  const nextBlog = () => {
    setBlogIndex((prev) => (prev + 1) % blogPosts.length);
  };

  const prevBlog = () => {
    setBlogIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  const getVisiblePosts = () => {
    const posts = [];
    for (let i = 0; i < 3; i++) {
      posts.push(blogPosts[(blogIndex + i) % blogPosts.length]);
    }
    return posts;
  };

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-hero-content">
          <h1 className="team-title">
            Our Team
            <span className="title-underline"></span>
          </h1>
        </div>
      </section>

      {/* Team Grid */}
      <section className="team-grid-section">
        <div className="container">
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-card-inner">
                  <div className="team-member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-member-info">
                    <span className="member-role">{member.role}</span>
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-desc">{member.desc}</p>
                    <div className="member-socials">
                      <a href="#" className="social-btn"><i className="fab fa-facebook-f"></i></a>
                      <a href="#" className="social-btn"><i className="fab fa-twitter"></i></a>
                      <a href="#" className="social-btn"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Carousel Section */}
      <section className="team-blog-section">
        <div className="container">
          <div className="blog-header">
            <span className="blog-label">READ ARTICLES</span>
            <h2 className="blog-heading">Latest from the Blog</h2>
          </div>

          <div className="blog-carousel-wrapper">
            <div className="blog-carousel">
              {getVisiblePosts().map((post, idx) => (
                <div key={`${post.id}-${idx}`} className="blog-card">
                  <div className="blog-info">
                    <div className="blog-meta">
                      {post.category} • {post.date}
                    </div>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-summary">{post.summary}</p>
                    <Link to={post.link} className="blog-arrow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-nav">
              <button className="nav-btn" onClick={prevBlog}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="nav-btn" onClick={nextBlog}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
