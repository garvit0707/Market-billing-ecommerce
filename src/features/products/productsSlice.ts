import { createSlice } from '@reduxjs/toolkit';
import { ProductsState } from '../../types';
import { PRODUCTS, SPECIAL_OFFERS } from '../../constants';

const initialState: ProductsState = {
  products: PRODUCTS,
  offers: SPECIAL_OFFERS,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;