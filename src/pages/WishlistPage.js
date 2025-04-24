import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 Typography, Card, CardContent, CardMedia, Button, Grid, Box, Snackbar,
  Alert, Fade, Skeleton, Dialog, DialogTitle, DialogActions,Stack
} from '@mui/material';
import { fetchWishlist, removeFromWishlistAsync } from '../features/wishlistSlice';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const { items, status } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, wishlistId: null });

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleConfirmRemove = (wishlistId) => {
    setConfirmDialog({ open: true, wishlistId });
  };

  const handleDialogClose = (confirmed) => {
    if (confirmed && confirmDialog.wishlistId) {
      dispatch(removeFromWishlistAsync(confirmDialog.wishlistId)).then(() => {
        setOpenSnackbar(true);
      });
    }
    setConfirmDialog({ open: false, wishlistId: null });
  };

  const handleBuyNow = (product) => {
    navigate('/buy', { state: { product } });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box disableGutters sx={{ mt: 4, px: { xs: 2, sm: 3, md: 6, lg: 8, xl: 12 } }}>
      <Typography variant="h4" gutterBottom>
        ❤️ My Wishlist
      </Typography>

      {status === 'loading' ? (
        <Grid container spacing={3}>
          {[...Array(3)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={250} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : items.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty Wishlist"
            width="150"
            style={{ opacity: 0.5 }}
          />
          <Typography variant="h6" mt={2}>My wishlist is empty!</Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{flex: 1}}>
          {items.map((product) => (
            <Fade in={true} key={product.wishlistId ?? product.id}>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2.4}
              >
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
                  <Box sx={{
                    flex: '0 0 200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    width:{ xs: '100%', sm: 200,md:400,lg:900 }
                  }}>
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
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleConfirmRemove(product.wishlistId ?? product.id)}
                      sx={{ flex: 1 }}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleBuyNow(product)}
                      sx={{ flex: 1 }}
                    >
                      Buy Now
                    </Button>
                  </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Item removed from wishlist.
        </Alert>
      </Snackbar>

      <Dialog open={confirmDialog.open} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Remove item from wishlist?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
          <Button onClick={() => handleDialogClose(true)} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WishlistPage;
