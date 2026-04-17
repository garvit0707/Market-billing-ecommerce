import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addItem,
  decrementQuantity,
  removeItem,
  clearCart,
} from '../features/cart/cartSlice';
import { useBill } from '../hooks/useBill';
import { formatPrice } from '../utils/billing';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const bill = useBill();
  const [checkoutMsg, setCheckoutMsg] = useState(false);

  const handleClear = () => dispatch(clearCart());

  const handleCheckout = () => {
    setCheckoutMsg(true);
    setTimeout(() => setCheckoutMsg(false), 3000);
  };

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-page__header">
          <h1 className="cart-page__title">
            Your <em>Basket</em>
          </h1>
        </div>
        <div className="cart-empty">
          <span className="cart-empty__icon">🧺</span>
          <h2 className="cart-empty__title">Your basket is empty</h2>
          <p className="cart-empty__sub">
            Head back to the shop and pick some fresh items.
          </p>
          <Link to="/" className="btn-shop">
            Browse Products →
          </Link>
        </div>
      </main>
    );
  }

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <main className="cart-page">
      <div className="cart-page__header">
        <div>
          <h1 className="cart-page__title">
            Your <em>Basket</em>
          </h1>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-3)',
              marginTop: 6,
            }}
          >
            {totalItems} item{totalItems !== 1 ? 's' : ''} ·{' '}
            <Link
              to="/"
              style={{
                color: 'var(--gold)',
                textDecoration: 'none',
                fontSize: '0.82rem',
              }}
            >
              + Add more
            </Link>
          </p>
        </div>
      </div>

      <div className="cart-page__body">
        <div className="cart-items-section">
          <div className="cart-items-section__label">
            Items in your basket
          </div>

          {cartItems.map((item, i) => (
            <div
              className="cart-item-row"
              key={item.product.id}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="cart-item-row__emoji">
                {item.product.emoji}
              </div>

              <div className="cart-item-row__info">
                <div className="cart-item-row__name">
                  {item.product.name}
                </div>
                <div className="cart-item-row__meta">
                  {formatPrice(item.product.price)} / {item.product.unit} ·{' '}
                  {item.product.category}
                </div>
              </div>

              <div className="cart-item-row__qty">
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => {
                      if (item.quantity === 1)
                        dispatch(removeItem(item.product.id));
                      else dispatch(decrementQuantity(item.product.id));
                    }}
                  >
                    −
                  </button>
                  <span className="qty-num">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(addItem(item.product))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-row__price">
                {formatPrice(item.product.price * item.quantity)}
              </div>

              <button
                className="cart-item-row__remove"
                onClick={() => dispatch(removeItem(item.product.id))}
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Right: Bill Panel */}
        <aside className="bill-panel">
          <h2 className="bill-panel__title">Order Summary</h2>

          {/* Item lines */}
          {bill.itemBreakdowns.map((item) => (
            <div key={item.productId} className="bill-line">
              <span className="bill-line__name">
                {item.productName}
                <span className="bill-line__qty"> ×{item.quantity}</span>
              </span>
              <span className="bill-line__amount">
                {formatPrice(item.lineTotal)}
              </span>
            </div>
          ))}

          <hr className="bill-sep" />

          {/* Subtotal */}
          <div className="bill-line bill-line--subtotal">
            <span className="bill-line__name">Subtotal</span>
            <span className="bill-line__amount">
              {formatPrice(bill.subtotal)}
            </span>
          </div>

          {/* Applied offers */}
          {bill.appliedOffers.length > 0 && (
            <div className="bill-offers-block">
              <div className="bill-offers-block__label">
                🏷 Offers applied
              </div>
              {bill.appliedOffers.map((offer) => (
                <div key={offer.offerId} className="bill-offer-line">
                  <span className="bill-offer-line__desc">
                    {offer.description}
                  </span>
                  <span className="bill-offer-line__saving">
                    −{formatPrice(offer.savings)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Total savings */}
          {bill.totalSavings > 0 && (
            <>
              <hr className="bill-sep" />
              <div className="bill-line bill-line--savings">
                <span className="bill-line__name">💰 Total Savings</span>
                <span className="bill-line__amount">
                  −{formatPrice(bill.totalSavings)}
                </span>
              </div>
            </>
          )}

          <hr className="bill-sep--heavy" />

          {/* Final total */}
          <div className="bill-total">
            <span className="bill-total__label">Total to Pay</span>
            <span className="bill-total__amount">
              {formatPrice(bill.finalTotal)}
            </span>
          </div>

          {bill.totalSavings > 0 && (
            <div className="savings-callout">
              You saved {formatPrice(bill.totalSavings)} with today's offers 🎉
            </div>
          )}

          <button className="btn-checkout" onClick={handleCheckout}>
            {checkoutMsg ? '✓ Order Placed!' : 'Proceed to Checkout →'}
          </button>

          <button className="btn-clear" onClick={handleClear}>
            Clear Basket
          </button>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;