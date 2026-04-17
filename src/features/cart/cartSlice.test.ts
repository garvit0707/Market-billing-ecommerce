import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product } from '../../types';

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (!item) return;

      if (item.quantity === 1) {
        state.items = state.items.filter(
          (i) => i.product.id !== action.payload
        );
      } else {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;