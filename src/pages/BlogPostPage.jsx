import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import batteryStorageImg from '../assets/battery_storage.png';
import blueHouseImg from '../assets/blue_house.png';
import windmillImg from '../assets/windmill.png';
import blog1 from '../assets/blog1.png';
import blog2 from '../assets/blog2.png';
import windfarmHillsImg from '../assets/windfarm_hills.png';
import windfarmSunsetImg from '../assets/windfarm_sunset.png';
import workersImg from '../assets/workers.png';
import './BlogPostPage.css';

const BlogPostPage = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const location = useLocation();

  const galleryImages = [
    blog1,
    windmillImg,
    blueHouseImg,
    windfarmHillsImg,
    windfarmSunsetImg,
    workersImg
  ];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };
  
  // Dynamic content based on path
  const isPost2 = location.pathname === '/blog-post-2';
  const isPost3 = location.pathname === '/blog-post-3';
  const isPost991 = location.pathname === '/blog-post-991';
  
  const postData = {
    title: isPost991
      ? "An opportunity for energy independence"
      : (isPost3 
        ? "Tips to reduce your home's energy use" 
        : (isPost2 ? "What are the profits of solar energy?" : "How many solar panels do you need?")),
    heroImage: isPost991
      ? "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg"
      : (isPost3
        ? "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4.jpg"
        : (isPost2 
          ? "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3.jpg"
          : "https://savexelectricals.com/wp-content/uploads/2020/04/post-image1.jpg")),
    category: isPost991 ? "TECHNOLOGIES" : "ENERGY",
    date: isPost991 ? "November 17, 2022" : "April 12, 2020",
    comments: isPost991 ? "3 Comments" : "0 Comments",
    videoThumbnail: isPost991 ? batteryStorageImg : "https://savexelectricals.com/wp-content/uploads/2020/04/manufacturing-image.jpg",
    likeCount: isPost991 ? 0 : 2
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="blog-post-page">
      <section className="blog-detail-hero">
        <div className="hero-bg-overlay"></div>
        <img 
          src={postData.heroImage} 
          alt="Solar Panels" 
          className="hero-bg-image" 
        />
        
        <div className="container hero-content">
          <div className="category-badge">{postData.category}</div>
          <h1 className="hero-title">{postData.title}</h1>
          
          <div className="post-meta-row">
            <div className="author-info">
              <div className="author-avatar">
                <img src="https://secure.gravatar.com/avatar/2b59616035ec8912d8a562479e0a2489?s=96&d=mm&r=g" alt="Author" />
              </div>
              <span className="meta-text">SCOLUSINFOTECH@GMAIL.COM</span>
            </div>
            <span className="meta-dot">•</span>
            <span className="meta-text">{postData.date}</span>
            <span className="meta-dot">•</span>
            <span className="meta-text">{postData.comments}</span>
          </div>
        </div>
      </section>
      
      <div className="container blog-article-body">
        <div className="blog-text-content">
          <div className="drop-quote-section">
            <span className="drop-cap-q">Q</span>
            <p>
              uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed consectetur adipiscing elit, sed do eiusm onsectetur adipiscing elit, sed do eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed do.
            </p>
          </div>
          
          <p>
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.
          </p>

          <h2 className="content-subheading">At vero eos et accusam</h2>
          
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam.
          </p>

          <div className="blog-testimonial-card">
            <p className="testimonial-text">
              Adipiscing elit, sed do eiusmod tempor incididunt labore et dolore sed magna iste natus sit aliqua ut enim minim adipiscing elit, sed do.
            </p>
            <div className="testimonial-author">
              <span className="author-line"></span>
              <span className="author-name">Piter Bowman</span>
            </div>
          </div>

          <p className="post-bottom-text">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>

          <div className="blog-video-section">
            <div className="video-thumbnail" onClick={() => setIsVideoOpen(true)}>
              <img src={postData.videoThumbnail} alt="Video Thumbnail" />
              <div className="play-button-overlay">
                <div className="play-icon-circle">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="video-bottom-content">
              <h2 className="content-subheading">Creative approach to every project</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. Lorem ipsum dolo.
              </p>
              <p>
                Aenean et egestas nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce gravida, ligula non molestie tristique, justo elit blandit risus, blandit maximus augue magna accumsan ante.
              </p>

              <div className="post-tags-container">
                {['company', 'energy', 'green', 'panels', 'power', 'solar'].map(tag => (
                  <span className="post-tag" key={tag}>{tag}</span>
                ))}
              </div>

              <div className="post-footer-divider"></div>

              <div className="post-social-actions">
                <button className="like-btn">
                  <div className="like-icon-circle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <span className="like-count">{postData.likeCount}</span>
                </button>
              </div>

              <div className="post-footer-divider"></div>

              <div className="post-navigation">
                <div className="nav-item prev">
                  <span className="nav-label">{"<"} PREVIOUS</span>
                  <h4 className="nav-title">
                    {isPost991 ? "How to make solar work for any home" : "What are the profits of solar energy?"}
                  </h4>
                </div>
                {!isPost991 && (
                  <div className="nav-item next">
                    <span className="nav-label">NEXT {">"}</span>
                    <h4 className="nav-title">Is solar worth it? Find out this summer!</h4>
                  </div>
                )}
              </div>

              {/* About Author Card */}
              <div className="about-author-card">
                <div className="author-card-avatar">
                  <svg viewBox="0 0 24 24" fill="#ccc">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="author-card-info">
                  <h3 className="author-card-name">scolusinfotech@gmail.com</h3>
                  <span className="author-card-label">ABOUT AUTHOR</span>
                  <div className="author-card-socials">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fas fa-globe"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>

              {/* Specific Comments List for Post 991 */}
              {isPost991 && (
                <div className="post-comments-list">
                  <h2 className="comment-section-title">3 Comments</h2>
                  
                  <div className="comment-item">
                    <div className="comment-avatar">
                      <img src="https://secure.gravatar.com/avatar/10a8cc17c9bbcc7716d23e090a6c37257dbf84b9757afaa6e920ecfef129af5f?s=90&d=mm&r=g" alt="Dorothy" />
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <h4 className="comment-author">Dorothy</h4>
                        <span className="comment-date">November 27, 2022 at 10:04 am</span>
                      </div>
                      <p className="comment-text">
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                      </p>
                      <button className="comment-reply-btn">
                        Reply <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>

                  <div className="comment-item reply-comment">
                    <div className="comment-avatar">
                      <img src="https://secure.gravatar.com/avatar/bbef7f2c275ad2c8cfd6c116832b0a8e89fd878015e056e6d1f483e4d5c5bc07?s=90&d=mm&r=g" alt="Kevin" />
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <h4 className="comment-author">Kevin</h4>
                        <span className="comment-date">November 27, 2022 at 10:04 am</span>
                      </div>
                      <p className="comment-text">
                        Aenean et egestas nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      </p>
                      <button className="comment-reply-btn">
                        Reply <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>

                  <div className="comment-item">
                    <div className="comment-avatar">
                      <img src="https://secure.gravatar.com/avatar/afb88f961edb998f38a69753d7f36341a4421dad9c77571add51a66d26464493?s=90&d=mm&r=g" alt="Roxy" />
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <h4 className="comment-author">Roxy</h4>
                        <span className="comment-date">November 27, 2022 at 10:05 am</span>
                      </div>
                      <p className="comment-text">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                      </p>
                      <button className="comment-reply-btn">
                        Reply <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Leave a Comment Section */}
              <div className="leave-comment-section">
                <h2 className="comment-section-title">Leave a comment</h2>
                <form className="comment-form">
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" placeholder="Your Name *" required />
                    </div>
                    <div className="form-group">
                      <input type="email" placeholder="Your E-mail *" required />
                    </div>
                  </div>
                  
                  <div className="form-checkbox">
                    <input type="checkbox" id="save-info" />
                    <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
                  </div>

                  <div className="form-group textarea-group">
                    <textarea placeholder="Your comment *" required></textarea>
                  </div>

                  <div className="form-checkbox">
                    <input type="checkbox" id="data-agree" required />
                    <label htmlFor="data-agree">I agree that my submitted data is being collected and stored.</label>
                  </div>

                  <button type="submit" className="submit-comment-btn">Leave a comment</button>
                </form>
              </div>

              {/* You May Also Like Section */}
              <div className="related-posts-section">
                <h2 className="related-section-title">You May Also Like</h2>
                <div className="related-posts-grid">
                  {isPost991 ? (
                    <>
                      {/* First Card: Gallery */}
                      <div className="related-post-card">
                        <div className="related-post-image gallery-style">
                          <img src={galleryImages[galleryIndex]} alt="Related Gallery" />
                          <button className="gallery-slider-btn prev" onClick={prevImage}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10271D" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                          </button>
                          <button className="gallery-slider-btn next" onClick={nextImage}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10271D" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          </button>
                        </div>
                        <div className="related-post-info">
                          <span className="related-post-category">TECHNOLOGIES</span>
                          <h4 className="related-post-title">How to find the best solar companies in California</h4>
                        </div>
                      </div>

                      {/* Second Card: Quote Post (No Image) */}
                      <div className="related-post-card quote-style">
                        <div className="related-post-info">
                          <span className="related-post-category">TECHNOLOGIES</span>
                          <h4 className="related-post-title">Quote Post</h4>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="related-post-card">
                        <div className="related-post-image">
                          <img src="https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-890x664.jpg" alt="Related Post 1" />
                        </div>
                        <div className="related-post-info">
                          <span className="related-post-category">ENERGY</span>
                          <h4 className="related-post-title">What are the profits of solar energy?</h4>
                        </div>
                      </div>
                      <div className="related-post-card">
                        <div className="related-post-image">
                          <img src="https://savexelectricals.com/wp-content/uploads/2020/04/post-image1-890x664.jpg" alt="Related Post 2" />
                        </div>
                        <div className="related-post-info">
                          <span className="related-post-category">ENERGY</span>
                          <h4 className="related-post-title">Tips to reduce your home's energy use</h4>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Video Modal Overlay */}
          {isVideoOpen && (
            <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
              <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-video-modal" onClick={() => setIsVideoOpen(false)}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="video-iframe-container">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/5mI69yNoO2o?autoplay=1" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
