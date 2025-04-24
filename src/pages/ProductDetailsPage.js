// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addToCartData } from '../features/productSlice';
import { addToWishlistAsync } from '../features/wishlistSlice';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  List,
  ListItem,
  Rating,
  Divider,
  Stack,
  CircularProgress,
  TextField,
  Paper
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const ProductDetailsPage = () => {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const product = items.find((item) => item.id.toString() === id);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCartData(product));
    }
  };

  const handleBuyNow = () => {
    if (product) {
      navigate('/buy', { state: { product } });
    }
  };

  const handleAddToWishlist = () => {
    const alreadyInWishlist = wishlistItems.some((item) => item.id === product.id);
    if (!alreadyInWishlist) {
      dispatch(addToWishlistAsync(product));
    } else {
      alert('This product is already in your wishlist.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // fixed here
    if (input.trim() !== '') {
      setMessage([...message, input]);
      setInput('');
    }
  };

  if (status === 'loading') {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography variant="h6">Loading product details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          Error loading product details. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return <Typography align="center" mt={4}>Product not available...</Typography>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1500, mt: 4, px: { xs: 2, sm: 4, md: 6 }, boxSizing: 'border-box' }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 3, p: 2 }}>
        <Box sx={{ flex: '1 1 40%', display: 'flex', justifyContent: 'left', alignItems: 'center', p: 2 }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              maxWidth: 450,
              maxHeight: 500,
              objectFit: 'contain',
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
            }}
          />
        </Box>

        <CardContent sx={{ flex: '1 1 60%', p: 3 }}>
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
                            {product.name}
          </Typography>
          <Typography color="text.secondary" variant="body1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex' }}>
                            Price: <Typography sx={{ fontWeight: 'none', ml: 1 }}>₹{product.price}</Typography>
          </Typography>

          {product.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography sx={{ ml: 1 }}>{product.rating.toFixed(1)} / 5</Typography>
            </Box>
          )}

          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description || 'No description available.'}
          </Typography>

          {product.features?.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom>Features:</Typography>
              <List dense>
                {product.features.map((feature, index) => (
                  <ListItem
                    key={index}
                    sx={{ pl: 2, listStyleType: 'disc', display: 'list-item' }}
                  >
                    {feature}
                  </ListItem>
                ))}
              </List>
            </>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              fullWidth
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<FlashOnIcon />}
              onClick={handleBuyNow}
              fullWidth
            >
              Buy Now
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<FavoriteBorderIcon />}
              onClick={handleAddToWishlist}
              fullWidth
            >
              Wishlist
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {product.reviews?.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom>Customer Reviews</Typography>
          {product.reviews.map((review, index) => (
            <Box
              key={index}
              sx={{
                mb: 3,
                p: 2,
                border: '1px solid #ddd',
                borderRadius: 2,
                backgroundColor: '#fafafa',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={review.stars} readOnly size="medium" />
                <Typography variant="subtitle2" sx={{ ml: 1 }}>
                  {review.stars} out of 5
                </Typography>
              </Box>
              {review.title && (
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {review.title}
                </Typography>
              )}
              <Typography variant="body1" sx={{ mt: 1 }}>{review.comment}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                — {review.user} {review.date && `on ${review.date}`}
              </Typography>
            </Box>
          ))}
        </>
      )}

      {/* Chat Section */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>Chat with us</Typography>
      <Box
        sx={{
          border: '1px solid #ddd',
          borderRadius: 2,
          backgroundColor: '#fafafa',
          p: 2,
          mt: 2,
        }}
      >
        <Typography variant="body1" gutterBottom>
          Have questions? Ask us below!
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }} onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message here..."
              size="medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}  // fixed binding
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Box>

          <List>
            {message.map((msg, index) => (
              <ListItem key={index} disableGutters>
                <Paper elevation={2} sx={{ p: 1.5, width: '100%', bgcolor: '#e3f2fd' }}>
                  <Typography variant="body2">{msg}</Typography>
                </Paper>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
