import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCartData, addToCartData } from '../features/productSlice';
import { Typography, Grid, Card, CardContent, CardActions, Button, CardMedia, Stack, Box, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, cart } = useSelector((state) => state.products);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCartData());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCartData(product));
  };

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  // Filter the products based on the search query (case-insensitive search)
  const filteredItems = items.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', mt: 4, px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }, boxSizing: 'border-box' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>

      <TextField
        type="text"
        variant="outlined"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Use setSearchQuery to update the search query
        size="small"
        fullWidth
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {status === 'loading' && (
        <Typography variant="h6" align="center">Loading products...</Typography>
      )}

      {status === 'failed' && (
        <Typography variant="h6" align="center" color="error">Error fetching products!</Typography>
      )}

      {filteredItems.length === 0 && (
        <Typography variant="h6" align="center" color="text.secondary">No products found matching your search.</Typography>
      )}

      <Grid container spacing={6} sx={{ flex: 1 }}>
        {filteredItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  width: 370,
                  height: 300,
                  objectFit: 'contain',
                  backgroundColor: '#f0f0f0',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography color="text.secondary" variant="body1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex' }}>
                  Price: <Typography sx={{ fontWeight: 'none', ml: 1 }}>₹{product.price}</Typography>
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Stack direction="row" spacing={1} width="100%">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    size="small"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart ({cart.filter(item => item.id === product.id).length})
                  </Button>

                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth 
                    size="small"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    View Details
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsPage;
