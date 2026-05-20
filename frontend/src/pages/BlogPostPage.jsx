import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import batteryStorageImg from '../assets/battery_storage.png';
import blog1 from '../assets/blog1.png';
import blueHouseImg from '../assets/blue_house.png';
import windfarmHillsImg from '../assets/windfarm_hills.png';
import windfarmSunsetImg from '../assets/windfarm_sunset.png';
import windmillImg from '../assets/windmill.png';
import workersImg from '../assets/workers.png';
import { allPosts } from './BlogPage';
import './BlogPostPage.css';

const BlogPostPage = () => {
  const { id } = useParams();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const API_BASE_URL = 'http://localhost/yashvi/electry/backend';
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState({ type: '', text: '' });

  const galleryImages = [
    blog1, windmillImg, blueHouseImg,
    windfarmHillsImg, windfarmSunsetImg, workersImg
  ];

  // Find the post from allPosts by id
  const postId = parseInt(id) || (id === '991' ? 991 : 1);
  const post = allPosts.find(p => p.id === postId) || allPosts[0];

  // Resolve hero image
  const heroImage = post.image
    ? post.image
    : (post.images ? post.images[0] : batteryStorageImg);

  const nextImage = (e) => {
    e.preventDefault(); e.stopPropagation();
    setGalleryIndex(prev => (prev + 1) % galleryImages.length);
  };
  const prevImage = (e) => {
    e.preventDefault(); e.stopPropagation();
    setGalleryIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get-comments.php?post_id=${postId}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setComments(data);
        }
      }
    } catch (err) {
      console.warn('Failed to load comments', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentText) {
      setCommentStatus({ type: 'error', text: 'Please fill in your name, email, and comment.' });
      return;
    }

    setCommentStatus({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/add-comment.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          name: commentName,
          email: commentEmail,
          comment: commentText,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setCommentStatus({ type: 'success', text: data.message });
        setCommentName('');
        setCommentEmail('');
        setCommentText('');
        fetchComments();
      } else {
        setCommentStatus({ type: 'error', text: data.error || 'Unable to submit your comment.' });
      }
    } catch (err) {
      console.error(err);
      setCommentStatus({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  // Get prev/next posts for navigation
  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="blog-post-page">
      {/* Hero Section - uses the clicked post's image as background */}
      <section className="blog-detail-hero">
        <div className="hero-bg-overlay"></div>
        <img
          src={heroImage}
          alt={post.title}
          className="hero-bg-image"
        />
        <div className="container hero-content">
          <div className="category-badge">{post.category ? post.category.toUpperCase() : 'BLOG'}</div>
          <h1 className="hero-title">{post.title}</h1>
          <div className="post-meta-row">
            <div className="author-info">
              <div className="author-avatar">
                <img src="https://secure.gravatar.com/avatar/2b59616035ec8912d8a562479e0a2489?s=96&d=mm&r=g" alt="Author" />
              </div>
              <span className="meta-text">SCOLUSINFOTECH@GMAIL.COM</span>
            </div>
            <span className="meta-dot">•</span>
            <span className="meta-text">{post.date}</span>
            <span className="meta-dot">•</span>
            <span className="meta-text">{comments.length} Comments</span>
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
              <img src={batteryStorageImg} alt="Video Thumbnail" />
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
                {(post.tags || []).map(tag => (
                  <Link className="post-tag" key={tag} to={`/tag/${tag}`}>{tag}</Link>
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
                  <span className="like-count">0</span>
                </button>
              </div>

              <div className="post-footer-divider"></div>

              {/* Prev / Next Navigation */}
              <div className="post-navigation">
                {prevPost && (
                  <Link to={`/blog-post/${prevPost.id}`} className="nav-item prev">
                    <span className="nav-label">{'<'} PREVIOUS</span>
                    <h4 className="nav-title">{prevPost.title}</h4>
                  </Link>
                )}
                {nextPost && (
                  <Link to={`/blog-post/${nextPost.id}`} className="nav-item next">
                    <span className="nav-label">NEXT {'>'}</span>
                    <h4 className="nav-title">{nextPost.title}</h4>
                  </Link>
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
                </div>
              </div>

              {/* Leave a Comment Section */}
              <div className="leave-comment-section">
                <h2 className="comment-section-title">Leave a comment</h2>
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                  {commentStatus.text && (
                    <div className={`status-message-banner ${commentStatus.type}`}>
                      {commentStatus.text}
                    </div>
                  )}
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Your E-mail *"
                        value={commentEmail}
                        onChange={(e) => setCommentEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-checkbox">
                    <input type="checkbox" id="save-info" />
                    <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
                  </div>
                  <div className="form-group textarea-group">
                    <textarea
                      placeholder="Your comment *"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="form-checkbox">
                    <input type="checkbox" id="data-agree" required />
                    <label htmlFor="data-agree">I agree that my submitted data is being collected and stored.</label>
                  </div>
                  <button type="submit" className="submit-comment-btn">Leave a comment</button>
                </form>
              </div>

              {/* You May Also Like */}
              <div className="related-posts-section">
                <h2 className="related-section-title">You May Also Like</h2>
                <div className="related-posts-grid">
                  {allPosts
                    .filter(p => p.id !== post.id && (p.image || (p.images && p.images[0])))
                    .slice(0, 2)
                    .map(relPost => (
                      <Link to={`/blog-post/${relPost.id}`} key={relPost.id} className="related-post-card">
                        <div className="related-post-image">
                          <img
                            src={relPost.image || relPost.images[0]}
                            alt={relPost.title}
                          />
                        </div>
                        <div className="related-post-info">
                          <span className="related-post-category">{relPost.category ? relPost.category.toUpperCase() : 'BLOG'}</span>
                          <h4 className="related-post-title">{relPost.title}</h4>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
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
                src="https://www.youtube.com/embed/SQpbTTGe_gk?autoplay=1"
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
  );
};

export default BlogPostPage;
