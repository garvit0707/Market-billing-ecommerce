import React from 'react';
import { Product } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addItem,
  decrementQuantity,
  removeItem,
} from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/billing';

interface Props {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<Props> = ({ product, index = 0 }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((i) => i.product.id === product.id)
  );
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => dispatch(addItem(product));
  const handleDecrement = () => {
    if (quantity === 1) dispatch(removeItem(product.id));
    else dispatch(decrementQuantity(product.id));
  };

  return (
    <div
      className={`product-card${quantity > 0 ? ' in-cart' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="product-card__top">
        <div className="product-card__category">{product.category}</div>
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
      </div>

      <span className="product-card__emoji">{product.emoji}</span>

      <div className="product-card__name">{product.name}</div>
      <div className="product-card__desc">{product.description}</div>
      <div className="product-card__origin">📍 {product.origin}</div>

      <div className="product-card__footer">
        <div>
          <div className="product-card__price">{formatPrice(product.price)}</div>
          <div className="product-card__unit">per {product.unit}</div>
        </div>

        {quantity === 0 ? (
          <button
            className="btn-add"
            onClick={handleAdd}
            title="Add to basket"
          >
            +
          </button>
        ) : (
          <div className="qty-control">
            <button className="qty-btn" onClick={handleDecrement}>
              −
            </button>
            <span className="qty-num">{quantity}</span>
            <button className="qty-btn" onClick={handleAdd}>
              +
            </button>
          </div>
        )}
      </div>

      {quantity > 0 && (
        <div className="product-card__subtotal">
          {formatPrice(product.price * quantity)} in basket
        </div>
      )}
    </div>
  );
};

export default ProductCard;
