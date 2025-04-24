// features/wishlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/wishlist';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

// ✅ Fetch all wishlist items
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {
  const res = await axios.get(API_URL);
  // Add wishlistId field to each item for consistent ID handling
  return res.data.map(item => ({
    ...item,
    wishlistId: item.id // backend ID becomes wishlistId
  }));
});

// ✅ Add to wishlist
export const addToWishlistAsync = createAsyncThunk('wishlist/addToWishlistAsync', async (product) => {
  const res = await axios.post(API_URL, product);
  // Add wishlistId field from the response ID
  return { ...product, wishlistId: res.data.id };
});

// ✅ Remove from wishlist using wishlistId
export const removeFromWishlistAsync = createAsyncThunk('wishlist/removeFromWishlistAsync', async (wishlistId) => {
  await axios.delete(`${API_URL}/${wishlistId}`);
  return wishlistId;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Optional manual actions
    addToWishlist: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item =>
        (item.wishlistId ?? item.id) !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ✅ Add
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // ✅ Remove
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item =>
          (item.wishlistId ?? item.id) !== action.payload
        );
      });
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
