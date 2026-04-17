import React, { useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import ProductCard from '../components/Products/ProductCard';
import { CATEGORIES } from '../constants';

const ShopPage: React.FC = () => {
  const products = useAppSelector((state) => state.products.products);
  const offers = useAppSelector((state) => state.products.offers);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const offerIcons: Record<string, string> = {
    'offer-apples': '🍎',
    'offer-soup-bread': '🥣',
    'offer-milk': '🥛',
    'offer-eggs': '🥚',
    'offer-coffee': '☕',
  };

  return (
    <main className="shop-page">
      {/* Hero */}
      <div className="shop-hero">
        <div className="shop-hero__text">
          <div className="shop-hero__eyebrow">✦ Curated Daily Market</div>
          <h1 className="shop-hero__title">
            The Finest <em>Produce</em>
            <br />
            Delivered Fresh
          </h1>
          <p className="shop-hero__sub">
            Handpicked from local farms and trusted suppliers. Add to your
            basket and watch offers apply automatically.
          </p>
        </div>
        <div className="shop-hero__stats">
          <div className="stat">
            <div className="stat__num">{products.length}</div>
            <div className="stat__label">Products</div>
          </div>
          <div className="stat">
            <div className="stat__num">{offers.length}</div>
            <div className="stat__label">Live Offers</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cat-btn${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* Offers Section */}
      <div className="offers-section">
        <div className="offers-section__header">
          <h2 className="offers-section__title">Today's Offers</h2>
          <span className="offers-section__sub">
            Applied automatically at checkout
          </span>
        </div>
        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <span className="offer-card__icon">
                {offerIcons[offer.id] ?? '🏷️'}
              </span>
              <div className="offer-card__text">
                <div className="offer-card__title">Special Offer</div>
                <div className="offer-card__desc">{offer.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;