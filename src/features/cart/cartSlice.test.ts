import cartReducer, {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from './cartSlice';
import { CartState } from '../../types';
import { PRODUCTS } from '../../constants';

const soup = PRODUCTS.find((p) => p.id === 'soup')!;
const milk = PRODUCTS.find((p) => p.id === 'milk')!;

const emptyState: CartState = { items: [] };

describe('cartSlice', () => {
  it('should return empty initial state', () => {
    expect(cartReducer(undefined, { type: '' })).toEqual(emptyState);
  });

  it('should add a new item', () => {
    const state = cartReducer(emptyState, addItem(soup));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('should increment quantity when adding existing item', () => {
    let state = cartReducer(emptyState, addItem(soup));
    state = cartReducer(state, addItem(soup));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should remove an item', () => {
    let state = cartReducer(emptyState, addItem(soup));
    state = cartReducer(state, removeItem(soup.id));
    expect(state.items).toHaveLength(0);
  });

  it('should increment quantity', () => {
    let state = cartReducer(emptyState, addItem(soup));
    state = cartReducer(state, incrementQuantity(soup.id));
    expect(state.items[0].quantity).toBe(2);
  });

  it('should decrement quantity', () => {
    let state = cartReducer(emptyState, addItem(soup));
    state = cartReducer(state, incrementQuantity(soup.id));
    state = cartReducer(state, decrementQuantity(soup.id));
    expect(state.items[0].quantity).toBe(1);
  });

  it('should remove item when decremented to 0', () => {
    let state = cartReducer(emptyState, addItem(soup));
    state = cartReducer(state, decrementQuantity(soup.id));
    expect(state.items).toHaveLength(0);
  });

  it('should clear all items', () => {
    let state = cartReducer(emptyState, addItem(soup));
    state = cartReducer(state, addItem(milk));
    state = cartReducer(state, clearCart());
    expect(state.items).toHaveLength(0);
  });
});