import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const Header: React.FC = () => {
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <span className="app-header__logo">🛒</span>
          <div>
            <h1 className="app-header__title">FreshMart</h1>
            <p className="app-header__tagline">Smart shopping, smart savings</p>
          </div>
        </div>
        <div className="app-header__basket">
          <span className="basket-icon">🧺</span>
          {totalItems > 0 && (
            <span className="basket-badge">{totalItems}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;