import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import cartSlice from "../features/cartSlice";
import wishlistSlice from "../features/wishlistSlice"; 
import authSlice  from  "../features/authSlice"
const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    wishlist: wishlistSlice, 
    auth:authSlice,
  },
});

export default store;
