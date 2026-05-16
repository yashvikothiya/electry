import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';

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
      id: 3,
      title: "Solar energy and the modern smart home",
      category: "Technologies",
      date: "November 17, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image1.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "gallery",
      imagePosition: 'bottom'
    },
    {
      id: 4,
      title: "How to find the best solar companies in California",
      category: "Technologies",
      date: "November 17, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image2-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "gallery-dark"
    },
    {
      id: 2,
      title: "How to make solar work for any home",
      category: "Technologies",
      date: "November 17, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image5-1290x725.jpg",
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
            </div>

            {/* Right Column: Sidebar */}
            <aside className="blog-sidebar">
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
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      {cat.name} <span>({cat.count})</span>
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
            </aside>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogPage;
