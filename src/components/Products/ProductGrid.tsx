import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  const products = useAppSelector((state) => state.products.products);
  const offers = useAppSelector((state) => state.products.offers);

  return (
    <section className="products-section">
      <div className="section-header">
        <h2 className="section-title">Today's Products</h2>
        <p className="section-subtitle">Fresh picks, great prices</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="offers-banner">
        <div className="offers-banner__header">
          <span className="offers-banner__icon">🏷️</span>
          <h3 className="offers-banner__title">Special Offers</h3>
        </div>
        <ul className="offers-list">
          {offers.map((offer) => (
            <li key={offer.id} className="offer-item">
              <span className="offer-item__dot" />
              {offer.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductGrid;