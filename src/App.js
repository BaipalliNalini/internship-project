import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import BuyPage from "./pages/BuyPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from  "./components/privateRouting"; // PrivateRoute component
import LogoutPage from "./pages/logoutPage"; // LogoutPage component
import { setUserFromStorage } from "./features/authSlice"; // Import action
import Terms from "./pages/Terms"; // Terms page component
import RegisterPage from "./pages/RagisterPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.auth); // Access user and status from the store

  // Dispatch the setUserFromStorage action when the app is mounted to load user data from localStorage
  useEffect(() => {
    dispatch(setUserFromStorage()); // Load user data from localStorage if available
  }, [dispatch]);

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user && status === 'idle') {
      navigate('/login'); // Redirect to login page if no user
    }
  }, [user, status, navigate]);

  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/products" 
          element={
            <ProductPage 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          } 
        />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route  path="/register" element={<RegisterPage/>}/>

        {/* Protected Routes (Requires Authentication) */}
        <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
        <Route path="/wishlist" element={<PrivateRoute element={<WishlistPage />} />} />
        <Route path="/buy" element={<PrivateRoute element={<BuyPage />} />} />

        {/* Catch-All Route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
