import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';

import blueHouseImg from '../assets/blue_house.png';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allPosts = [
    {
      id: 1,
      title: "An opportunity for energy independence",
      category: "Technologies",
      date: "November 17, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image"
    },
    {
      id: 5,
      title: "How many solar panels do you need?",
      category: "Technologies",
      date: "November 17, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
    },
    {
      id: 2,
      title: "How to make solar work for any home",
      category: "Technologies",
      date: "November 17, 2022",
      image: blueHouseImg, /* Moved to 3rd position globally */
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image"
    },
    {
      id: 6,
      title: "Quote Post",
      category: "Technologies",
      date: "November 17, 2022",
      quote: "Dipiscing elit, sed do eiusmod tempor incidunt ut labore adipiscing et dolore magna minim totam rem iste natus sit aliqua.",
      footerText: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. nemo enim ipsam voluptatem, quia voluptas sit.",
      type: "quote"
    },
    {
      id: 7,
      title: "Do you need a roof to go solar?",
      category: "Solar Power",
      date: "November 16, 2022",
      image: blueHouseImg,
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image"
    },
    {
      id: 8,
      title: "Solar for schools: savings and a better future",
      category: "Solar Power",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image5-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image"
    },
    {
      id: 9,
      title: "How a solar battery protects your home",
      category: "Solar Power",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg", /* Sunset windmills */
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image"
    }
  ];

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { name: 'Energy', count: 3 },
    { name: 'Green Power', count: 4 },
    { name: 'Hydropower', count: 3 },
    { name: 'News', count: 4 },
    { name: 'Solar Power', count: 9 },
    { name: 'Technologies', count: 5 }
  ];

  return (
    <div className="blog-page">
      {/* Banner Section */}
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-content">
            <h1 className="blog-title">
              Blog – Standard
              <span className="title-underline"></span>
            </h1>
          </div>
        </div>
      </section>

      {/* Blog Main Section */}
      <section className="blog-main-content">
        <div className="container">
          <div className="blog-top-nav">
            <Link to="/about-us" className="blog-back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </Link>
          </div>

          <div className="blog-grid-layout">
            
            {/* Left Column: Posts */}
            <div className="blog-posts-column">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <React.Fragment key={post.id}>
                    <article className="blog-post-item">
                      {/* Media (Top) */}
                      {post.imagePosition !== 'bottom' && (
                        <div className="post-media-container">
                          {post.type === 'video' ? (
                            <div className="post-image-wrapper media-post">
                              {playingVideoId === post.id ? (
                                <iframe 
                                  width="100%" 
                                  height="100%" 
                                  src={post.videoUrl} 
                                  title="Video Player" 
                                  frameBorder="0" 
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                  allowFullScreen
                                  className="post-inline-video"
                                ></iframe>
                              ) : (
                                <>
                                  <img src={post.image} alt={post.title} className="post-featured-img" />
                                  <div className="video-play-btn" onClick={() => setPlayingVideoId(post.id)}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </div>
                                </>
                              )}
                            </div>
                          ) : post.type === 'gallery-dark' ? (
                            <div className="post-image-wrapper gallery-post dark-nav">
                              <img src={post.image} alt={post.title} className="post-featured-img" />
                              <div className="gallery-dark-control">
                                <button className="dark-nav-prev">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                  </svg>
                                </button>
                                <button className="dark-nav-next">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                  </svg>
                                </button>
                              </div>
                              <div className="corner-nav corner-left">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                              </div>
                              <div className="corner-nav corner-right">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                              </div>
                              <div className="gallery-pulse-point center"></div>
                            </div>
                          ) : post.type === 'gallery' ? (
                            <div className="post-image-wrapper gallery-post">
                              <img src={post.image} alt={post.title} className="post-featured-img" />
                              <div className="gallery-nav-btns">
                                <button className="gallery-prev-btn">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                  </svg>
                                </button>
                                <button className="gallery-next-btn">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                  </svg>
                                </button>
                              </div>
                              <div className="gallery-pulse-point"></div>
                            </div>
                          ) : post.type === 'image' ? (
                            <div className="post-image-wrapper">
                              <img src={post.image} alt={post.title} className="post-featured-img" />
                            </div>
                          ) : null}
                        </div>
                      )}
                      
                      <div className="post-content-body">
                        <h2 className="post-main-title">{post.title}</h2>
                        <div className="post-meta-data">
                          <span className="post-cat">{post.category.toUpperCase()}</span>
                          <span className="meta-sep">•</span>
                          <span className="post-date">{post.date}</span>
                        </div>
                        <p className="post-excerpt">{post.excerpt}</p>
                        <Link to={`/blog-post-${post.id}`} className="post-read-more-link">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </Link>
                      </div>

                      {/* Quote Type Specific Content */}
                      {post.type === 'quote' && (
                        <div className="post-quote-container">
                          <div className="quote-box">
                            <div className="quote-icon">
                              <svg viewBox="0 0 448 512" width="28" height="28" fill="currentColor">
                                <path d="M0 216C0 149.7 53.7 96 120 96h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8c-39.8 0-72 32.2-72 72v24h80c26.5 0 48 21.5 48 48v128c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V216zm256 0c0-66.3 53.7-120 120-120h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8c-39.8 0-72 32.2-72 72v24h80c26.5 0 48 21.5 48 48v128c0 26.5-21.5 48-48 48H304c-26.5 0-48-21.5-48-48V216z"/>
                              </svg>
                            </div>
                            <blockquote className="main-blockquote">
                              {post.quote}
                            </blockquote>
                          </div>
                          <p className="quote-footer-text">{post.footerText}</p>
                          <Link to={`/blog-post-${post.id}`} className="post-read-more-link mt-20">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </Link>
                        </div>
                      )}

                      {/* Media (Bottom) */}
                      {post.imagePosition === 'bottom' && (
                        <div className="post-media-container mt-40">
                          {post.type === 'gallery' ? (
                            <div className="post-image-wrapper gallery-post">
                              <img src={post.image} alt={post.title} className="post-featured-img" />
                              <div className="gallery-nav-btns">
                                <button className="gallery-prev-btn">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                  </svg>
                                </button>
                                <button className="gallery-next-btn">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                  </svg>
                                </button>
                              </div>
                              <div className="gallery-pulse-point"></div>
                            </div>
                          ) : post.type === 'image' ? (
                            <div className="post-image-wrapper">
                              <img src={post.image} alt={post.title} className="post-featured-img" />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </article>

                    {/* Standalone Audio Player between 2nd and 3rd posts */}
                    {index === 1 && (
                      <article className="blog-post-item audio-standalone-widget">
                        <div className="post-audio-player">
                          <div className="audio-controls">
                            <button className="audio-play-small">
                              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </button>
                            <span className="audio-time">00:00</span>
                            <div className="audio-progress-bar">
                              <div className="audio-progress-fill"></div>
                            </div>
                            <span className="audio-time">00:00</span>
                            <button className="audio-volume-btn">
                              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                              </svg>
                            </button>
                            <div className="audio-volume-bar">
                              <div className="audio-volume-fill"></div>
                            </div>
                          </div>
                        </div>
                      </article>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <div className="no-posts-found">
                  <h3>No posts found matching your search.</h3>
                  <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="reset-filter-btn">Clear All Filters</button>
                </div>
              )}

              {/* Pagination Section */}
              <div className="blog-pagination">
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">3</button>
                <button className="pagination-btn">4</button>
                <button className="pagination-btn next-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <aside className="blog-sidebar">
              <div className="blog-sidebar-sticky-wrap">
                <div className="sidebar-widget search-widget">
                  <h3 className="widget-title">Search</h3>
                  <div className="search-form-wrap">
                    <svg className="search-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Search ..." 
                      className="sidebar-search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sidebar-widget categories-widget">
                  <h3 className="widget-title">Categories</h3>
                  <ul className="category-list">
                    <li 
                      className={selectedCategory === 'All' ? 'active' : ''} 
                      onClick={() => setSelectedCategory('All')}
                    >
                      All Posts
                    </li>
                    {categories.map(cat => (
                      <li 
                        key={cat.name}
                        className={selectedCategory === cat.name ? 'active' : ''}
                      >
                        <Link to={`/category/${cat.name.toLowerCase().replace(' ', '-')}`} className="category-sidebar-link">
                          {cat.name} <span>({cat.count})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sidebar-widget recent-posts-widget">
                  <h3 className="widget-title">Recent Posts</h3>
                  <div className="recent-posts-list">
                    {allPosts.slice(0, 2).map(post => (
                      <Link key={post.id} to={`/blog-post-${post.id}`} className="recent-post-small">
                        <div className="recent-thumb">
                          <img src={post.image} alt="Thumb" />
                        </div>
                        <div className="recent-info">
                          <div className="recent-meta">{post.category.toUpperCase()} • Nov 17, 2022</div>
                          <h4>{post.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="sidebar-widget tags-widget">
                  <h3 className="widget-title">Tags</h3>
                  <div className="tags-cloud">
                    {['commercial', 'company', 'energy', 'green', 'hydro', 'panels', 'power', 'solar'].map(tag => (
                      <span key={tag} className="tag-item">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Decorative Banner */}
                <div className="sidebar-banner-widget">
                  <img src="https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg" alt="Solar Banner" />
                  <div className="banner-logo-overlay">
                    <span className="banner-brand">Soleil</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogPage;
