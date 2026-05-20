import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allPosts } from './BlogPage';
import './TagPage.css';

const TagPage = () => {
  const { tagName } = useParams();
  const [galleryIndexes, setGalleryIndexes] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tagName]);

  const handleGalleryPrev = (e, postId, totalImages) => {
    e.preventDefault();
    e.stopPropagation();
    setGalleryIndexes(prev => ({
      ...prev,
      [postId]: (prev[postId] === 0 || prev[postId] === undefined) ? totalImages - 1 : prev[postId] - 1
    }));
  };

  const handleGalleryNext = (e, postId, totalImages) => {
    e.preventDefault();
    e.stopPropagation();
    setGalleryIndexes(prev => ({
      ...prev,
      [postId]: (prev[postId] === undefined || prev[postId] === totalImages - 1) ? 0 : prev[postId] + 1
    }));
  };

  // Filter posts that contain the tag (case-insensitive check)
  const filteredPosts = allPosts.filter(post => 
    post.tags && post.tags.some(t => t.toLowerCase() === tagName.toLowerCase())
  );

  const formattedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);

  const renderPostMedia = (post) => {
    const activeIndex = galleryIndexes[post.id] || 0;
    
    switch(post.type) {
      case 'video':
        return (
          <div className="card-image-wrap video-post">
            {post.videoUrl ? (
              <video 
                src={post.videoUrl} 
                poster={post.image} 
                controls 
                className="inline-post-video"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <>
                <img src={post.image} alt={post.title} />
                <div className="video-play-overlay">
                  <div className="play-btn-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case 'gallery':
        const images = post.images || (post.image ? [post.image] : []);
        return (
          <div className="card-image-wrap gallery-post">
            {images.length > 0 && (
              <img src={images[activeIndex]} alt={post.title} />
            )}
            {images.length > 1 && (
              <div className="gallery-nav-btns">
                <button className="gallery-nav-btn prev" onClick={(e) => handleGalleryPrev(e, post.id, images.length)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="gallery-nav-btn next" onClick={(e) => handleGalleryNext(e, post.id, images.length)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        );
      case 'audio':
        return (
          <div className="audio-post-widget">
            <div className="audio-controls">
              <button className="audio-play-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="audio-line"></div>
              <button className="audio-vol-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              </button>
              <div className="audio-vol-line"></div>
            </div>
          </div>
        );
      case 'quote':
        return (
          <div className="quote-post-card-content">
            <div className="quote-box-wrap">
              <div className="quote-icon-small">
                <svg viewBox="0 0 448 512" width="20" height="20" fill="#E31E24">
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8c-39.8 0-72 32.2-72 72v24h80c26.5 0 48 21.5 48 48v128c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V216zm256 0c0-66.3 53.7-120 120-120h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8c-39.8 0-72 32.2-72 72v24h80c26.5 0 48 21.5 48 48v128c0 26.5-21.5 48-48 48H304c-26.5 0-48-21.5-48-48V216z"/>
                </svg>
              </div>
              <p className="quote-text-main">{post.quote}</p>
            </div>
            <p className="quote-footer-desc">{post.footerText}</p>
          </div>
        );
      default:
        return (
          <div className="card-image-wrap">
            <img src={post.image || "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg"} alt={post.title} />
          </div>
        );
    }
  };

  return (
    <div className="tag-page">
      {/* Tag Hero */}
      <section className="tag-hero">
        <div className="hero-bg-overlay"></div>
        <div className="container">
          <h1 className="tag-title">Tag: {tagName.toLowerCase()}</h1>
        </div>
      </section>

      {/* Tag Grid */}
      <section className="tag-grid-section">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="tag-posts-grid">
              {filteredPosts.map(post => (
                <div key={post.id} className={`tag-post-card-wrap ${post.type}-type`}>
                  <Link to={`/blog-post/${post.id}`} className="tag-post-card">
                    {renderPostMedia(post)}
                    <div className="card-content">
                      {post.type !== 'quote' && (
                        <>
                          <div className="card-meta">
                            <span className="card-cat">{post.category ? post.category.toUpperCase() : 'BLOG'}</span>
                            <span className="card-sep">•</span>
                            <span className="card-date">{post.date}</span>
                          </div>
                          <h3 className="card-title">{post.title}</h3>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-posts-tag">
              <h3>No posts found matching the tag {tagName.toLowerCase()}.</h3>
              <Link to="/blog" className="back-blog-btn">Back to Blog</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TagPage;
