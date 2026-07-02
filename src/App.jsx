import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Phone', price: 20000, category: 'Electronics', rating: 4, reviews: 120, img: '/assets/images/phone.jpg' },
  { id: 2, name: 'Laptop', price: 60000, category: 'Electronics', rating: 4, reviews: 95, img: '/assets/images/laptop.jpg' },
  { id: 3, name: 'Shoes', price: 3000, category: 'Fashion', rating: 4, reviews: 80, img: '/assets/images/shoes.jpg' },
  { id: 4, name: 'Watch', price: 5000, category: 'Accessories', rating: 4, reviews: 60, img: '/assets/images/watch.jpg' }
];

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [cart, setCart] = useState([
    { id: 1, name: 'Phone', price: 20000, quantity: 1, img: '/assets/images/phone.jpg' },
    { id: 3, name: 'Shoes', price: 3000, quantity: 1, img: '/assets/images/shoes.jpg' }
  ]);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id, amount) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      {/* FLOATING HEADER NAVBAR COMPONENT */}
      <header className="floating-header-wrapper">
        <nav className="navbar">
          <div className="logo">
            <i className="fa-solid fa-bag-shopping"></i>
            <h1>Shop<span>Ease</span></h1>
          </div>
          <ul className="nav-links">
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#products-section">Products</a></li>
            <li><a href="#categories-section">Categories</a></li>
          </ul>
          <div className="nav-icons">
            <button className="icon-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
            <button className="icon-btn cart-icon-wrapper">
              <i className="fa-solid fa-cart-shopping"></i>
              {totalCartItems > 0 && <span className="badge">{totalCartItems}</span>}
            </button>
          </div>
        </nav>
      </header>

      {/* HERO BANNER COMPONENT */}
      <section className="hero-banner">
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="hero-tag">Best Quality, Best Prices</span>
            <h2>Welcome to <br /><span>ShopEase</span></h2>
            <p>Find the best products at the best prices</p>
            <button className="shop-now-btn">Shop Now <i className="fa-solid fa-arrow-right"></i></button>
          </div>
          <div className="hero-image-wrapper">
            <div className="mockup-cart-display">
              <img src="/assets/images/hero-cart.jpg" alt="ShopEase Trolley Display" className="main-hero-illustration" />
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        {/* CATEGORIES SECTION */}
        <section id="categories-section">
          <h2 className="section-title">Categories</h2>
          <div className="categories-grid">
            <div className="cat-card electronics">
              <div className="icon-shape"><img src="/assets/images/cat-electronics.jpg" alt="Electronics" /></div>
              <h3>Electronics</h3>
              <a href="#products-section" onClick={() => setSelectedCategory('Electronics')} className="explore-btn">Explore →</a>
            </div>
            <div className="cat-card fashion">
              <div className="icon-shape"><img src="/assets/images/cat-fashion.jpg" alt="Fashion" /></div>
              <h3>Fashion</h3>
              <a href="#products-section" onClick={() => setSelectedCategory('Fashion')} className="explore-btn">Explore →</a>
            </div>
            <div className="cat-card shoes">
              <div className="icon-shape"><img src="/assets/images/cat-shoes.jpg" alt="Shoes" /></div>
              <h3>Shoes</h3>
              <a href="#products-section" onClick={() => setSelectedCategory('all')} className="explore-btn">Explore →</a>
            </div>
            {/* RESTORED BOOKS CATEGORY */}
            <div className="cat-card books">
              <div className="icon-shape"><img src="/assets/images/cat-books.jpg" alt="Books" /></div>
              <h3>Books</h3>
              <a href="#products-section" onClick={() => setSelectedCategory('all')} className="explore-btn">Explore →</a>
            </div>
          </div>
        </section>

        {/* FILTERS AND CATALOG COMPONENT */}
        <section id="products-section">
          <h2 className="section-title">Featured Products</h2>
          <div className="filter-controls-bar">
            <div className="search-field-group">
              <input 
                type="text" 
                id="searchBox" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="products-layout-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.img} className="product-image" alt={product.name} />
                <h4>{product.name}</h4>
                <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SHOPPING CART SECTION */}
        <section className="shopping-cart-card">
          <div className="cart-card-header">Your Cart</div>
          <div className="cart-items-list">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <h5>{item.name}</h5>
                <div className="cart-qty-counter">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-card-footer">
            <h3>Total: <span>₹{totalCartPrice.toLocaleString('en-IN')}</span></h3>
          </div>
        </section>
      </main>

      {/* RESTORED PREMIUM FULL SITE FOOTER FROM YOUR SCREENSHOT */}
      <footer className="app-site-footer">
        <div className="container footer-grid-layout">
          <div className="footer-brand-column">
            <h3>ShopEase</h3>
            <p>Find the best products at the best prices.</p>
          </div>
          <div className="footer-links-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#products-section">Products</a></li>
              <li><a href="#categories-section">Categories</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links-column">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-newsletter-column">
            <h4>Newsletter</h4>
            <p>Subscribe to get updates on new products and offers.</p>
            <div className="newsletter-input-group">
              <input type="email" placeholder="Enter your email" />
              <button className="newsletter-subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="container footer-bottom-meta-row">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <div className="footer-social-icons">
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}






