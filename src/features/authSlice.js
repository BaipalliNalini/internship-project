import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Load user from localStorage if exists
const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: storedUser || null,
  status: 'idle',
  error: null,
};

// Register user thunk with duplicate check
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;
      const existingUser = users.find(
        (u) => u.email === userData.email || u.mobile === userData.mobile
      );

      if (existingUser) {
        return thunkAPI.rejectWithValue('Email or Mobile already exists');
      }

      const res = await axios.post('http://localhost:3000/users', userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Registration failed due to network error');
    }
  }
);

// Login user thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, mobile }, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;
      const user = users.find((u) => u.email === email || u.mobile === mobile);

      if (user) return user;
      return thunkAPI.rejectWithValue('Invalid email or mobile number');
    } catch (error) {
      return thunkAPI.rejectWithValue('Login failed due to network error');
    }
  }
);

// Logout user thunk
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Restore user from localStorage manually (optional)
    setUserFromStorage: (state) => {
      const user = JSON.parse(localStorage.getItem('user'));
      state.user = user || null;
    },
    // ✅ New feature: clear auth error manually
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setUserFromStorage, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
