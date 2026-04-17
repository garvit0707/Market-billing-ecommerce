import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Header from './components/Layout/Header';
import ProductGrid from './components/Products/ProductGrid';
import Bill from './components/Bill/Bill';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <main className="app-main">
          <div className="app-layout">
            <ProductGrid />
            <Bill />
          </div>
        </main>
        <footer className="app-footer">
          <p>© 2024 FreshMart · Prices include VAT · Offers subject to availability</p>
        </footer>
      </div>
    </Provider>
  );
};

export default App;