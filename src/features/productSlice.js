// src/features/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Async thunk: Fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
});

// Async thunk: Fetch cart data
export const fetchCartData = createAsyncThunk('products/fetchCartData', async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
});

// Async thunk: Add to cart
export const addToCartData = createAsyncThunk('products/addToCartData', async (product) => {
  const response = await axios.post(`${BASE_URL}/cart`, product);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],         // Product list
    cart: [],          // Cart list
    status: 'idle',    // Global status for product/cart
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch Cart
      .addCase(fetchCartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add to Cart
      .addCase(addToCartData.fulfilled, (state, action) => {
        // Optional: prevent duplicates in cart here too
        const exists = state.cart.some((item) => item.id === action.payload.id);
        if (!exists) {
          state.cart.push(action.payload);
        }
      });
  },
});

export default productSlice.reducer;
