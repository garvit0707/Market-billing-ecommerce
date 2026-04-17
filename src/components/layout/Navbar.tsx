import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const Navbar: React.FC = () => {
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">
            Fresh<span>Mart</span>
          </span>
          <span className="navbar__tagline">Est. 2026 · London</span>
        </Link>

        <div className="navbar__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar__link${isActive ? ' active' : ''}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `navbar__link${isActive ? ' active' : ''}`
            }
          >
            Offers
          </NavLink>
        </div>

        <Link to="/cart" className="navbar__cart-btn">
          <span className="navbar__cart-icon">🧺</span>
          <span>Basket</span>
          {totalItems > 0 && (
            <span className="navbar__cart-count" key={totalItems}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;