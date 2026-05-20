import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blog1 from '../assets/blog1.png';
import blog2 from '../assets/blog2.png';
import blog3 from '../assets/blog3.png';
import plantImg from '../assets/plant.png';
import windmillImg from '../assets/windmill.png';
import workersImg from '../assets/workers.png';
import windfarmHillsImg from '../assets/windfarm_hills.png';
import windfarmSunsetImg from '../assets/windfarm_sunset.png';
import './BlogPage.css';

import blueHouseImg from '../assets/blue_house.png';
import batteryStorageImg from '../assets/battery_storage.png';

export const allPosts = [
    {
      id: 991,
      title: "An opportunity for energy Independence",
      category: "Technologies",
      date: "November 17, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["energy", "power", "commercial"]
    },
    {
      id: 992,
      title: "How to make solar work for any home",
      category: "Technologies",
      date: "November 17, 2022",
      image: batteryStorageImg,
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/SQpbTTGe_gk?autoplay=1",
      tags: ["solar", "panels", "green"]
    },
    {
      id: 993,
      title: "Solar energy and the modern smart home",
      category: "Technologies",
      date: "November 17, 2022",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "audio",
      tags: ["solar", "energy", "company"]
    },
    {
      id: 994,
      title: "How to find the best solar companies in California",
      category: "Technologies",
      date: "November 17, 2022",
      images: [
        "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image4.jpg",
        "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image5-840x473.jpg",
        "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image6.jpg"
      ],
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "gallery",
      tags: ["solar", "company", "power"]
    },
    {
      id: 995,
      title: "Quote Post",
      category: "Technologies",
      date: "November 17, 2022",
      quote: "Dipiscing elit, sed do eiusmod tempor incidunt ut labore adipiscing et dolore magna minim totam rem iste natus sit aliqua.",
      footerText: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. nemo enim ipsam voluptatem, quia voluptas sit.",
      type: "quote",
      tags: ["company", "green"]
    },
    {
      id: 996,
      title: "Do you need a roof to go solar?",
      category: "Solar Power",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image5-840x473.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["solar", "panels", "hydro"]
    },
    {
      id: 10,
      title: "Solar for schools: savings and a better future",
      category: "Solar Power",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image3-840x473.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["solar", "power", "green"]
    },
    {
      id: 11,
      title: "How a solar battery protects your home",
      category: "Solar Power",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image2-840x473.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["solar", "energy", "power"]
    },
    {
      id: 13,
      title: "Who is advancing solar technology today?",
      category: "SOLAR POWER",
      date: "November 16, 2022",
      image: windfarmHillsImg,
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image",
      tags: ["solar", "company", "panels"]
    },
    {
      id: 1,
      title: "What factors affect the cost of a business going solar?",
      category: "Solar Power",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image8-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image",
      tags: ["solar", "commercial", "power"]
    },
    {
      id: 12,
      title: "Are solar batteries worth the investment?",
      category: "Solar Power",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2020/04/post-image2-1024x683.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image",
      tags: ["solar", "energy", "panels"]
    },
    {
      id: 5,
      title: "How to find a solar company near me",
      category: "SOLAR POWER",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2020/04/service-image9-1024x683.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image",
      tags: ["solar", "company", "power"]
    },
    {
      id: 14,
      title: "Commercial solar power systems: a guide",
      category: "Solar Power",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2020/04/service-image8-1024x683.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image",
      tags: ["solar", "commercial", "panels"]
    },
    {
      id: 6,
      title: "Become a solar energy expert in 6 simple steps",
      category: "Solar Power",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/typography-image2-1024x683.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image",
      tags: ["solar", "energy", "power"]
    },
    {
      id: 7,
      title: "What effects does hydropower have on the environment?",
      category: "Hydropower",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image11-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image",
      tags: ["hydro", "green", "power"]
    },
    {
      id: 8,
      title: "Facts about the potential of hydroelectric power",
      category: "Hydropower",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image10-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image",
      tags: ["hydro", "power", "green"]
    },
    {
      id: 2,
      title: "How sustainable hydropower can promote biodiversity",
      category: "Hydropower",
      date: "November 16, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image9-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing...",
      type: "image",
      tags: ["hydro", "green", "company"]
    },
    {
      id: 9,
      title: "Rising prices: the time for solar is now!",
      category: "Green Power",
      date: "November 10, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image8-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["solar", "power", "green"]
    },
    {
      id: 15,
      title: "Understanding the current solar tariffs",
      category: "Green Power",
      date: "November 10, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image7-1024x1024.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["solar", "power", "panels"]
    },
    {
      id: 16,
      title: "Is your smart home ready for summer?",
      category: "Green Power",
      date: "November 10, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image6-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["power", "energy", "company"]
    },
    {
      id: 17,
      title: "Is solar worth it? Find out this summer!",
      category: "Green Power",
      date: "November 10, 2022",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image5-1290x725.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["solar", "green", "power"]
    },
    {
      id: 18,
      title: "How many solar panels do you need?",
      category: "Energy",
      date: "April 12, 2020",
      image: "https://savexelectricals.com/wp-content/uploads/2020/04/post-image1-1290x725.jpg",
      excerpt: "Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit,...",
      type: "image",
      tags: ["panels", "solar", "energy"]
    },
    {
      id: 19,
      title: "What are the profits of solar energy?",
      category: "Energy",
      date: "April 12, 2020",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg",
      excerpt: "Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit,...",
      type: "image",
      tags: ["solar", "energy"]
    },
    {
      id: 20,
      title: "Tips to reduce your home's energy use",
      category: "Energy",
      date: "April 12, 2020",
      image: "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg",
      excerpt: "Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit,...",
      type: "image",
      tags: ["energy", "power", "green"]
    },
    {
      id: 21,
      title: "Harnessing the power of solar panels",
      category: "News",
      date: "April 11, 2020",
      image: "https://savexelectricals.com/wp-content/uploads/2024/06/post-vb1-1024x765.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["solar", "panels", "power"]
    },
    {
      id: 22,
      title: "Solar power is making renewable energy",
      category: "News",
      date: "April 10, 2020",
      image: "https://savexelectricals.com/wp-content/uploads/2024/06/post-vb2-1024x765.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["solar", "power", "green"]
    },
    {
      id: 23,
      title: "The environmental impact of wind turbines",
      category: "News",
      date: "April 9, 2020",
      image: "https://savexelectricals.com/wp-content/uploads/2024/06/post-vb3-1024x765.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["green", "power", "company"]
    },
    {
      id: 25,
      title: "Which energy is the better investment?",
      category: "News",
      date: "April 8, 2020",
      image: "https://savexelectricals.com/wp-content/uploads/2024/06/post-vb4-1024x765.jpg",
      excerpt: "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing..",
      type: "image",
      tags: ["energy", "power"]
    }
  ];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [galleryIndexes, setGalleryIndexes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

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

  

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

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
          <div className="blog-grid-layout">
            
            {/* Left Column: Posts */}
            <div className="blog-posts-column">
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
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
                                  <Link to={`/blog-post/${post.id}`}>
                                    <img src={post.image} alt={post.title} className="post-featured-img" />
                                  </Link>
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
                              <Link to={`/blog-post/${post.id}`} state={{ imageIndex: 0 }}>
                                <img src={post.image} alt={post.title} className="post-featured-img" />
                              </Link>
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
                              <Link to={`/blog-post/${post.id}`} state={{ imageIndex: galleryIndexes[post.id] || 0 }}>
                                <img src={post.images[galleryIndexes[post.id] || 0]} alt={post.title} className="post-featured-img" />
                              </Link>
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
                          ) : post.type === 'audio' ? (
                            <div className="post-audio-player">
                              <div className="audio-controls">
                                <button className="audio-play-small">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
                                  </svg>
                                </button>
                                <span className="audio-time">00:00</span>
                                <div className="audio-progress-bar"></div>
                                <span className="audio-time">00:00</span>
                                <button className="audio-volume-btn">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polygon points="9 10 7 11 7 13 9 14 11 16 11 8 9 10" fill="currentColor"></polygon>
                                    <path d="M14.5 10.5a2.5 2.5 0 0 1 0 3"></path>
                                  </svg>
                                </button>
                                <div className="audio-volume-bar">
                                  <div className="audio-volume-fill"></div>
                                </div>
                              </div>
                            </div>
                          ) : post.type === 'image' ? (
                            <div className="post-image-wrapper">
                              <Link to={`/blog-post/${post.id}`}>
                                <img src={post.image} alt={post.title} className="post-featured-img" />
                              </Link>
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
                        <Link to={`/blog-post/${post.id}`} className="post-read-more-link">
                          <span className="read-more-text">read more</span>
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
                          <Link to={`/blog-post/${post.id}`} className="post-read-more-link mt-20">
                            <span className="read-more-text">read more</span>
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
                {currentPage > 1 && (
                  <button 
                    className="pagination-btn prev-btn"
                    onClick={() => {setCurrentPage(currentPage - 1); window.scrollTo(0, 0);}}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </button>
                )}
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i + 1}
                    className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => {setCurrentPage(i + 1); window.scrollTo(0, 0);}}
                  >
                    {i + 1}
                  </button>
                ))}
                {currentPage < totalPages && (
                  <button 
                    className="pagination-btn next-btn"
                    onClick={() => {setCurrentPage(currentPage + 1); window.scrollTo(0, 0);}}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                )}
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
                      placeholder="Search .." 
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
                    {allPosts.filter(post => post.id === 1 || post.id === 2).map(post => (
                      <Link key={post.id} to={`/blog-post/${post.id}`} className="recent-post-small">
                        <div className="recent-thumb">
                          <img src={post.image || (post.images && post.images[0])} alt="Thumb" />
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
                      <Link key={tag} to={`/tag/${tag}`} className="tag-item">{tag}</Link>
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
