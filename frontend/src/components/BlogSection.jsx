import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogSection.css';

const BlogSection = () => {
  const navigate = useNavigate();
  const posts = [
    {
      category: "ENERGY",
      date: "April 12, 2020",
      title: "How many solar panels do you need?",
      excerpt: "Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt....",
      link: "/blog-post/18"
    },
    {
      category: "ENERGY",
      date: "April 12, 2020",
      title: "What are the profits of solar energy?",
      excerpt: "Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt....",
      link: "/blog-post/19"
    },
    {
      category: "ENERGY",
      date: "April 12, 2020",
      title: "Tips to reduce your home's energy use",
      excerpt: "Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt....",
      link: "/blog-post/20"
    }
  ];

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-header">
          <span className="blog-subtitle">READ ARTICLES</span>
          <h2 className="blog-title">Latest from the Blog</h2>
        </div>

        <div className="blog-grid">
          {posts.map((post, index) => (
            <div className="blog-card" key={index}>
              <div className="blog-card-meta">
                <span className="blog-category">{post.category}</span>
                <span className="blog-dot">•</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div 
                className="blog-card-arrow" 
                onClick={() => post.link !== '#' && navigate(post.link)}
                style={{ cursor: post.link !== '#' ? 'pointer' : 'default' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
