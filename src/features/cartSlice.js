// src/features/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';  // Make sure your JSON Server is running on this port

// Fetch cart items from the server
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
});

// Add product to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async (product) => {
  const response = await axios.post(`${BASE_URL}/cart`, { ...product });
  return response.data;
});

// Remove product from the cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id) => {
  await axios.delete(`${BASE_URL}/cart/${id}`);
  return id;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart handling
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add to cart handling
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      })

      // Remove from cart handling
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      });
  }
});

export default cartSlice.reducer;
