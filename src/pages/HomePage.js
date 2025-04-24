import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { Typography, Grid, Card, CardContent, Button, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom';
const HomePage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ padding: 0, margin: 0}}>
      
      {/* Hero Section */}
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 4,
          flexWrap: 'wrap',
          color: '#1c1c1c',
          minHeight: { xs: 'auto', md: 760 }  // Responsive height
        }}
      >
        <Box sx={{ ml: { xs: 0, md: 5 }, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#1c1c1c', fontSize: { xs: '2rem', md: '3rem' } }}>
            Welcome To Our <br /> e-kart shopping 
          </Typography>
          <Typography variant="h5" sx={{ color: '#1c1c1c', fontSize: { xs: '1rem', md: '1.5rem' } }}>
            Find the perfect gift for your loved ones — from the latest smartphones to elegant jewelry and tech gadgets.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: '#1c1c1c', 
              '&:hover': { backgroundColor: '#1F8CC7' }, 
              mt: 9,
              px: 4,
              py: 2,
              fontSize: '1.5rem',
              borderRadius: 2
            }}
          >
            Contact Us
          </Button>
        </Box>

        <Box
          component="img"
          src="/ecommerce-removebg-preview.png"
          alt="ecommerce"
          sx={{ 
            width: { xs: '100%', md: 500 },
            maxHeight: 500,
            mt: { xs: 3, md: 0 },
            mr: { xs: 0, md: 5 }
          }}
        />
      </Box>

      {/* Latest Products Section */}
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Latest Products
      </Typography>

      {status === 'loading' && <Typography align="center">Loading products...</Typography>}
      {status === 'failed' && <Typography align="center" color="error">Error fetching products!</Typography>}

      <Grid container spacing={1} sx={{ paddingX: 1, justifyContent: 'center' }}>
        {items.map((product) => (
          <Grid item xs={12} sm={6} md={2} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',textDecoration:'none' }}
            component={Link}
            to={`/product/${product.id}`}
            >
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'contain', width: 300, height: 250 }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom noWrap>{product.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
