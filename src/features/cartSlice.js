// src/features/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Make sure your JSON Server is running

// Fetch cart items from the server
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
});

// Add product to the cart (with quantity check)
export const addToCart = createAsyncThunk('cart/addToCart', async (product, { getState }) => {
  const state = getState();
  const existingItem = state.cart.cartItems.find(item => item.id === product.id);

  if (existingItem) {
    const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
    await axios.put(`${BASE_URL}/cart/${existingItem.id}`, updatedItem);
    return updatedItem;
  } else {
    const newItem = { ...product, quantity: 1 };
    const response = await axios.post(`${BASE_URL}/cart`, newItem);
    return response.data;
  }
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

      // Add to cart handling (update or add)
      .addCase(addToCart.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.cartItems[index] = action.payload; // update existing
        } else {
          state.cartItems.push(action.payload); // add new
        }
      })

      // Remove from cart handling
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      });
  }
});

export default cartSlice.reducer;
