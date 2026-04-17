import React, { useState } from 'react';
import { useBill } from '../../hooks/useBill';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearCart } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/billing';

const Bill: React.FC = () => {
  const bill = useBill();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    dispatch(clearCart());
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  if (cartItems.length === 0) {
    return (
      <aside className="bill-panel bill-panel--empty">
        <div className="bill-panel__empty-state">
          <span className="bill-panel__empty-icon">🧺</span>
          <h3>Your basket is empty</h3>
          <p>Add some products to see your bill here.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="bill-panel">
      <div className="bill-panel__header">
        <h2 className="bill-panel__title">Your Bill</h2>
        <span className="bill-panel__item-count">
          {cartItems.reduce((s, i) => s + i.quantity, 0)} items
        </span>
      </div>

      {/* Item breakdown */}
      <div className="bill-section">
        <h4 className="bill-section__label">Items</h4>
        {bill.itemBreakdowns.map((item) => (
          <div key={item.productId} className="bill-row">
            <span className="bill-row__name">
              {item.productName}
              <span className="bill-row__qty"> × {item.quantity}</span>
            </span>
            <span className="bill-row__amount">{formatPrice(item.lineTotal)}</span>
          </div>
        ))}
      </div>

      <div className="bill-divider" />

      {/* Subtotal */}
      <div className="bill-row bill-row--subtotal">
        <span>Subtotal</span>
        <span>{formatPrice(bill.subtotal)}</span>
      </div>

      {/* Special offers */}
      {bill.appliedOffers.length > 0 && (
        <>
          <div className="bill-section bill-section--offers">
            <h4 className="bill-section__label bill-section__label--green">
              🏷️ Offers Applied
            </h4>
            {bill.appliedOffers.map((offer) => (
              <div key={offer.offerId} className="bill-row bill-row--offer">
                <span className="bill-row__offer-desc">{offer.description}</span>
                <span className="bill-row__saving">
                  −{formatPrice(offer.savings)}
                </span>
              </div>
            ))}
          </div>
          <div className="bill-divider" />
        </>
      )}

      {/* Savings summary */}
      {bill.totalSavings > 0 && (
        <div className="bill-row bill-row--savings">
          <span>💰 Total Savings</span>
          <span className="savings-amount">−{formatPrice(bill.totalSavings)}</span>
        </div>
      )}

      <div className="bill-divider bill-divider--heavy" />

      {/* Final total */}
      <div className="bill-row bill-row--total">
        <span>Total to Pay</span>
        <span className="total-amount">{formatPrice(bill.finalTotal)}</span>
      </div>

      {bill.totalSavings > 0 && (
        <div className="bill-savings-callout">
          You saved {formatPrice(bill.totalSavings)} today! 🎉
        </div>
      )}

      <button
        className="btn btn--danger btn--full bill-clear-btn"
        onClick={handleClear}
      >
        {cleared ? '✓ Cleared!' : 'Clear Basket'}
      </button>
    </aside>
  );
};

export default Bill;