import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Navbar from './components/layout/Navbar';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <footer className="footer">
          <span className="footer__copy">
            © 2026 FreshMart Ltd — All rights reserved
          </span>
          <div className="footer__links">
            <a href="#" className="footer__link">Privacy</a>
            <a href="#" className="footer__link">Terms</a>
            <a href="#" className="footer__link">Contact</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;