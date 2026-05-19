import React, { useState, useRef } from 'react';
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
    id: 9,
    category: 'GREEN POWER',
    date: 'November 10, 2022',
    title: 'Rising prices: the time for solar is now!',
    image: 'https://savexelectricals.com/wp-content/uploads/2022/11/post-image8-1290x725.jpg',
    link: '/blog-post/9'
  },
  {
    id: 15,
    category: 'GREEN POWER',
    date: 'November 10, 2022',
    title: 'Understanding the current solar tariffs',
    image: 'https://savexelectricals.com/wp-content/uploads/2022/11/post-image7-1024x1024.jpg',
    link: '/blog-post/15'
  },
  {
    id: 16,
    category: 'GREEN POWER',
    date: 'November 10, 2022',
    title: 'Is your smart home ready for summer?',
    image: 'https://savexelectricals.com/wp-content/uploads/2022/11/post-image6-1290x725.jpg',
    link: '/blog-post/16'
  },
  {
    id: 17,
    category: 'GREEN POWER',
    date: 'November 10, 2022',
    title: 'Is solar worth it? Find out this summer!',
    image: 'https://savexelectricals.com/wp-content/uploads/2022/11/post-image5-1290x725.jpg',
    link: '/blog-post/17'
  }
];

const TeamPage = () => {
  const [blogIndex, setBlogIndex] = useState(0);
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const carouselWrapperRef = useRef(null);

  const nextBlog = () => {
    setBlogIndex((prev) => (prev + 1) % blogPosts.length);
  };

  const prevBlog = () => {
    setBlogIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  const handleMouseMove = (e) => {
    setFollowerPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseEnter = () => {
    setIsHoveringCarousel(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringCarousel(false);
  };

  const handleCarouselClick = (e) => {
    if (!carouselWrapperRef.current) return;
    const rect = carouselWrapperRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const midX = rect.width / 2;
    if (clickX < midX) {
      prevBlog();
    } else {
      nextBlog();
    }
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
            <span className="blog-label">FROM THE BLOG</span>
            <h2 className="blog-heading">Latest News</h2>
          </div>

          <div 
            className="blog-carousel-wrapper"
            ref={carouselWrapperRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCarouselClick}
            style={{ cursor: isHoveringCarousel ? 'none' : 'default' }}
          >
            <div className="blog-carousel">
              {getVisiblePosts().map((post, idx) => (
                <div key={`${post.id}-${idx}`} className="blog-card">
                  <div className="blog-image-wrapper">
                    <img src={post.image} alt={post.title} className="blog-img" />
                  </div>
                  <div className="blog-info">
                    <div className="blog-meta">
                      <span className="meta-category">{post.category}</span>
                      <span className="meta-divider">•</span>
                      <span className="meta-date">{post.date}</span>
                    </div>
                    <h3 className="team-blog-title">
                      <Link to={post.link} onClick={(e) => e.stopPropagation()}>{post.title}</Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {isHoveringCarousel && (
              <div 
                className="custom-cursor-follower"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  transform: `translate3d(${followerPos.x - 30}px, ${followerPos.y - 30}px, 0)`,
                  pointerEvents: 'none',
                  zIndex: 9999
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
