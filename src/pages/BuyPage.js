// src/pages/BuyPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,Box,Stack
} from '@mui/material';

const BuyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">No product selected for purchase.</Typography>
      </Container>
    );
  }

  const handleConfirmBuy = () => {
    alert(`Purchase confirmed for: ${product.name} at ₹${product.price}`);
    navigate('/'); // Redirect after purchase (optional)
  };
  const handleCancel = () => {
    alert(`cancel the product..`);
    navigate('/products'); // Redirect after purchase (optional)
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mt: 4, px: { xs: 2, sm: 4, md: 6 }, boxSizing: 'border-box' }}>
      <Typography variant="h4" gutterBottom>
        🛒 Checkout
      </Typography>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 3, p: 2 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ width: 300,height:300, objectFit: 'contain', background: '#f9f9f9' }}
        />
        <CardContent>
         <Typography
                               variant="h6"
                               fontWeight="bold"
                               gutterBottom
                               sx={{
                                 overflow: 'hidden',
                                 textOverflow: 'ellipsis',
                                 whiteSpace: 'nowrap',
                               }}
                               title={product.name}
                             >
                               {product.name}
                             </Typography>
         
                             <Typography variant="body2" color="text.secondary" sx={{ mb: 'auto' }}>
                               <strong>Price:</strong> ₹{product.price}
                             </Typography>
                             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
  <Button variant="contained" color="success" onClick={handleConfirmBuy}>
    Confirm Purchase
  </Button>
  <Button variant="contained" color="error" onClick={handleCancel}>
    Cancel
  </Button>
</Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BuyPage;
