import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [galleryIndexes, setGalleryIndexes] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const categoryData = {
    'energy': {
      title: "Energy",
      heroBg: 'https://savexelectricals.com/wp-content/uploads/2026/02/Untitled-design-2_page-0001-scaled.jpg',
      posts: [
        { id: 5, title: "How many solar panels do you need?", category: "Energy", date: "April 17, 2023", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg", type: "image" },
        { id: 10, title: "What are the profits of solar energy?", category: "Energy", date: "April 17, 2023", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg", type: "image" },
        { id: 11, title: "Tips to reduce your home's energy use", category: "Energy", date: "April 17, 2023", image: "https://savexelectricals.com/wp-content/uploads/2020/04/post-image1.jpg", type: "image" }
      ]
    },
    'green-power': {
      title: "Green Power",
      heroBg: 'https://savexelectricals.com/wp-content/uploads/2026/02/Untitled-design-2_page-0001-scaled.jpg',
      posts: [
        { id: 12, title: "Rising prices: the time for solar is now!", category: "Green Power", date: "November 17, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg", type: "image" },
        { id: 13, title: "Understanding the current solar tariffs", category: "Green Power", date: "November 17, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image5-1290x725.jpg", type: "image" },
        { id: 14, title: "Is your smart home ready for summer?", category: "Green Power", date: "November 17, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image2-1290x725.jpg", type: "image" },
        { id: 15, title: "Is solar worth it? Find out this summer!", category: "Green Power", date: "November 17, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg", type: "image" }
      ]
    },
    'hydropower': {
      title: "Hydropower",
      heroBg: 'https://savexelectricals.com/wp-content/uploads/2026/02/Untitled-design-2_page-0001-scaled.jpg',
      posts: [
        { id: 16, title: "What effects does hydropower have on the environment?", category: "Hydropower", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image6-1290x725.jpg", type: "image" },
        { id: 17, title: "Facts about the potential of hydroelectric power", category: "Hydropower", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image7-1290x725.jpg", type: "image" },
        { id: 18, title: "How sustainable hydropower can promote biodiversity", category: "Hydropower", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image8-1290x725.jpg", type: "image" }
      ]
    },
    'news': {
      title: "News",
      heroBg: 'https://savexelectricals.com/wp-content/uploads/2026/02/Untitled-design-2_page-0001-scaled.jpg',
      posts: [
        { id: 19, title: "Harnessing the power of solar panels", category: "News", date: "April 11, 2020", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image9-1290x725.jpg", type: "image" },
        { id: 20, title: "Solar power is making renewable energy", category: "News", date: "April 10, 2020", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image10-1290x725.jpg", type: "image" },
        { id: 21, title: "The environmental impact of wind turbines", category: "News", date: "April 09, 2020", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image11-1290x725.jpg", type: "image" },
        { id: 22, title: "Which energy is the better investment?", category: "News", date: "April 08, 2020", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image12-1290x725.jpg", type: "image" }
      ]
    },
    'solar-power': {
      title: "Solar Power",
      heroBg: 'https://savexelectricals.com/wp-content/uploads/2026/02/Untitled-design-2_page-0001-scaled.jpg',
      posts: [
        { id: 7, title: "Do you need a roof to go solar?", category: "Solar Power", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg", type: "image" },
        { id: 8, title: "Solar for schools: savings and a better future", category: "Solar Power", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image5-1290x725.jpg", type: "image" },
        { id: 9, title: "How a solar battery protects your home", category: "Solar Power", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg", type: "image" },
        { id: 27, title: "Who is advancing solar technology today?", category: "Solar Power", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image8-1290x725.jpg", type: "image" },
        { id: 28, title: "What factors affect the cost of a business going solar?", category: "Solar Power", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg", type: "image" },
        { id: 29, title: "Are solar batteries worth the investment?", category: "Solar Power", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image10-1290x725.jpg", type: "image" },
        { id: 30, title: "How to find a solar company near me", category: "Solar Power", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image12-1290x725.jpg", type: "image" },
        { id: 31, title: "Commercial solar power systems: a guide", category: "Solar Power", date: "November 16, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image11-1290x725.jpg", type: "image" }
      ]
    },
    'technologies': {
      title: "Technologies",
      heroBg: 'https://savexelectricals.com/wp-content/uploads/2026/02/Untitled-design-2_page-0001-scaled.jpg',
      posts: [
        { id: 1, title: "An opportunity for energy independence", category: "Technologies", date: "November 17, 2022", image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg", type: "image" },
        { id: 2, title: "How to make solar work for any home", category: "Technologies", date: "November 17, 2022", images: [
          "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image6-840x473.jpg",
          "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image5-840x473.jpg",
          "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image4-840x473.jpg"
        ], type: "gallery" },
        { id: 3, title: "Solar energy and the modern smart home", category: "Technologies", date: "November 17, 2022", type: "audio" },
        { id: 4, title: "How to find the best solar companies in California", category: "Technologies", date: "November 17, 2022", images: [
          "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image6-840x473.jpg",
          "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image5-840x473.jpg",
          "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image4-840x473.jpg",
          "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image2-1290x725.jpg"
        ], type: "gallery" },
        { id: 5, title: "Quote Post", category: "Technologies", date: "November 17, 2022", type: "quote", quote: "Dipiscing elit, sed do eiusmod tempor incidunt ut labore adipiscing et dolore magna minim totam rem iste natus sit aliqua.", footerText: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. nemo enim ipsam voluptatem, quia voluptas sit." }
      ]
    }
  };

  const currentCategory = categoryData[categoryName] || categoryData['energy'];

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
        return (
          <div className="card-image-wrap gallery-post">
            <img src={post.images[activeIndex]} alt={post.title} />
            <div className="gallery-nav-btns">
              <button className="gallery-nav-btn prev" onClick={(e) => handleGalleryPrev(e, post.id, post.images.length)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="gallery-nav-btn next" onClick={(e) => handleGalleryNext(e, post.id, post.images.length)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
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
            <img src={post.image} alt={post.title} />
          </div>
        );
    }
  };

  return (
    <div className="category-page">
      {/* Category Hero */}
      <section className="category-hero" style={{ backgroundImage: `url(${currentCategory.heroBg})` }}>
        <div className="hero-bg-overlay"></div>
        <div className="container">
          <h1 className="category-title">{currentCategory.title}</h1>
        </div>
      </section>

      {/* Category Grid */}
      <section className="category-grid-section">
        <div className="container">
          <div className="category-posts-grid">
            {currentCategory.posts.map(post => (
              <div key={post.id} className={`category-post-card-wrap ${post.type}-type`}>
                <Link to={`/blog-post/${post.id}`} className="category-post-card">
                  {renderPostMedia(post)}
                  <div className="card-meta">
                    <span className="card-cat">{post.category.toUpperCase()}</span>
                    <span className="card-sep">•</span>
                    <span className="card-date">{post.date}</span>
                  </div>
                  <h3 className="card-title">{post.title}</h3>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="blog-pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn next">→</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
