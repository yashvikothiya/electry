import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Selected category filter
  const categoryFilter = searchParams.get('category') || 'All';
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const catRes = await fetch('http://localhost/yashvi/electry/backend/get-categories.php');
      if (catRes.ok) {
        const catData = await catRes.json();
        if (Array.isArray(catData)) {
          setCategories(catData);
        }
      }
      
      // Fetch products
      const prodRes = await fetch('http://localhost/yashvi/electry/backend/get-products.php');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (Array.isArray(prodData)) {
          setProducts(prodData);
        }
      }
    } catch (err) {
      console.warn("Backend API not reachable.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryName) => {
    if (categoryName === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryName);
    }
    setSearchParams(searchParams);
  };

  const handleInquiry = (productName) => {
    // Redirect to contact page with pre-filled subject
    navigate(`/contact?subject=Inquiry about ${encodeURIComponent(productName)}`);
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'All' || 
      product.category_name?.toLowerCase() === categoryFilter.toLowerCase() ||
      product.cat_name?.toLowerCase() === categoryFilter.toLowerCase();
      
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      {/* Hero Header */}
      <section className="products-hero">
        <div className="container">
          <div className="products-hero-content">
            <span className="subtitle">Premium Lighting Solutions</span>
            <h1>Our Products</h1>
            <p>Explore our complete range of innovative, eco-friendly, and high-efficiency LED lights engineered for brilliance and sustainability.</p>
            <div className="hero-underline"></div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="products-catalog-section">
        <div className="container">
          
          {/* Top Bar with Search & Filters info */}
          <div className="catalog-topbar">
            <div className="search-box-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="product-search-input"
              />
            </div>
            <div className="results-count">
              Showing <span>{filteredProducts.length}</span> Products
            </div>
          </div>

          <div className="catalog-layout">
            {/* Sidebar Filters */}
            <aside className="catalog-sidebar">
              <div className="filter-card">
                <h3 className="filter-title">Categories</h3>
                <ul className="category-filter-list">
                  <li 
                    className={categoryFilter === 'All' ? 'active' : ''}
                    onClick={() => handleCategorySelect('All')}
                  >
                    <span className="cat-bullet"><i className="fa-solid fa-border-all"></i></span>
                    All Lighting
                  </li>
                  {categories.map((cat) => (
                    <li 
                      key={cat.id}
                      className={categoryFilter.toLowerCase() === cat.name.toLowerCase() ? 'active' : ''}
                      onClick={() => handleCategorySelect(cat.name)}
                    >
                      <span className="cat-bullet">
                        <i className={`fa-solid ${cat.icon || 'fa-lightbulb'}`}></i>
                      </span>
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar Help Card */}
              <div className="help-box-card">
                <h4>Custom Lighting?</h4>
                <p>Need wholesale solutions or customized lighting designs for commercial buildings?</p>
                <button onClick={() => navigate('/contact')} className="btn-contact-help">Get Free Consultation</button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="catalog-products-grid-wrapper">
              {loading ? (
                <div className="loading-spinner-container">
                  <div className="loader-spinner"></div>
                  <p>Loading SaveX products...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      {/* Product Image */}
                      <div className="product-img-wrap">
                        <img 
                          src={product.image_url || 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=600'} 
                          alt={product.name} 
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=600';
                          }}
                        />
                        <span className="product-badge">{product.category_name || product.cat_name || 'LED Light'}</span>
                      </div>

                      {/* Product Details */}
                      <div className="product-info-wrap">
                        <h3 className="product-name">{product.name}</h3>
                        
                        {/* Specifications */}
                        <div className="product-specs">
                          {product.wattage && (
                            <span className="spec-tag">
                              <i className="fa-solid fa-bolt"></i> {product.wattage}
                            </span>
                          )}
                          {product.voltage && (
                            <span className="spec-tag">
                              <i className="fa-solid fa-plug"></i> {product.voltage}
                            </span>
                          )}
                        </div>

                        <p className="product-desc">{product.description}</p>
                        
                        {/* Price & Stock */}
                        <div className="product-footer">
                          <div className="price-stock-wrap">
                            {product.price ? (
                              <span className="product-price">₹{parseFloat(product.price).toFixed(2)}</span>
                            ) : (
                              <span className="product-price-inquire">Contact for Price</span>
                            )}
                            <span className={`stock-status-badge ${product.stock_status === 'in_stock' ? 'in-stock' : 'out-of-stock'}`}>
                              {product.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>

                          <button 
                            className="btn-product-inquire"
                            onClick={() => handleInquiry(product.name)}
                          >
                            Inquire Now <i className="fa-solid fa-arrow-right-long"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-products-found">
                  <i className="fa-solid fa-lightbulb-slash"></i>
                  <h3>No products found</h3>
                  <p>Try resetting the category filter or searching for another keyword.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); handleCategorySelect('All'); }} 
                    className="btn-clear-filters"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
