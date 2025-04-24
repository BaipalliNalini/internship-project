// src/pages/CartPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { fetchCart, addToCart, removeFromCart } from '../features/cartSlice';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Box,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.products);
  const { cartItems, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveFromCart = async (product) => {
    await dispatch(removeFromCart(product.id));
    dispatch(fetchCart());
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleBuyNow = (product) => {
    navigate('/buy', { state: { product } });
  };

  if (status === 'loading') {
    return <Typography align="center" mt={4}>Loading your cart...</Typography>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1500, mt: 4, px: { xs: 2, sm: 4, md: 6 }, boxSizing: 'border-box' }}>
  <Typography variant="h4" align="left" gutterBottom>
    My Cart ({cartItems.length} items)
  </Typography>

  {cartItems.length === 0 ? (
    <Typography variant="h6" align="center">My cart is empty!</Typography>
  ) : (
    <Grid container spacing={4} sx={{ mt: 2 }}>
      {items
        .filter(product => cartItems.some(cartItem => cartItem.id === product.id))
        .map(product => {
          const quantity = cartItems.filter(item => item.id === product.id).length;

          return (
            <Grid item key={product.id} xs={12}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  boxShadow: 3,
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  minHeight: { xs: 300, md: 250 },
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    flex: '0 0 200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    width:{ xs: '100%', sm: 200,md:400,lg:900 }
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      width: { xs: '100%', sm: 180,md:360},
                      height: { xs: 'auto', sm: 180,md:400 },
                      objectFit: 'contain',
                      borderRadius: 2,
                    }}
                  />
                </Box>

                <CardContent sx={{ flex: 1, p: 2 }}>
                  <Typography variant="h5" gutterBottom>{product.name}</Typography>
                  <Typography color="text.secondary" variant="body1" gutterBottom>
                    Price: <strong>₹{product.price}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Quantity: {quantity}
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3} sx={{ flex: 1}}>
                    <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)} fullWidth>
                      Add (+)
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleRemoveFromCart(product)} fullWidth>
                      Remove ({quantity})
                    </Button>
                    <Button variant="contained" color="warning" onClick={() => handleBuyNow(product)} fullWidth>
                      Buy Now
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  )}
</Box>

  );
};

export default CartPage;