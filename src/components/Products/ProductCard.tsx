import React from 'react';
import { Product } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addItem, decrementQuantity, removeItem } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/billing';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.product.id === product.id)
  );
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => dispatch(addItem(product));
  const handleDecrement = () => {
    if (quantity === 1) {
      dispatch(removeItem(product.id));
    } else {
      dispatch(decrementQuantity(product.id));
    }
  };

  return (
    <div className={`product-card ${quantity > 0 ? 'product-card--active' : ''}`}>
      <div className="product-card__badge">{product.category}</div>
      <div className="product-card__emoji">{product.emoji}</div>
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">
          {formatPrice(product.price)}
          <span className="product-card__unit"> / {product.unit}</span>
        </p>
      </div>

      <div className="product-card__actions">
        {quantity === 0 ? (
          <button className="btn btn--primary btn--full" onClick={handleAdd}>
            Add to basket
          </button>
        ) : (
          <div className="quantity-control">
            <button className="qty-btn qty-btn--minus" onClick={handleDecrement}>
              −
            </button>
            <span className="qty-display">{quantity}</span>
            <button className="qty-btn qty-btn--plus" onClick={handleAdd}>
              +
            </button>
          </div>
        )}
      </div>

      {quantity > 0 && (
        <div className="product-card__subtotal">
          {formatPrice(product.price * quantity)} total
        </div>
      )}
    </div>
  );
};

export default ProductCard;