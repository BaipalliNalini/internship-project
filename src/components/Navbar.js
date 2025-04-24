import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Badge
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Products', path: '/products', icon: <ShoppingBagIcon /> },
    { text: 'Cart', path: '/cart', icon: <ShoppingCartIcon /> },
    { text: 'Wishlist', path: '/wishlist', icon: <FavoriteIcon /> },
    user
      ? { text: 'Logout', path: '/logout', icon: <LogoutIcon /> }
      : { text: 'Login', path: '/login', icon: <LoginIcon /> },
  ];

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#212121', marginBottom: 3 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <ShoppingCartIcon sx={{ mr: 1 }} />
            e-commerce stores
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ mx: 1 }}
              >
                {item.text === 'Cart' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', pr: 1 }}>
                    <Badge badgeContent={cartItems.length} color="error" showZero>
                      <ShoppingCartIcon />
                    </Badge>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Cart
                    </Typography>
                  </Box>
                ) : item.text === 'Wishlist' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge badgeContent={wishlistItems.length} color="secondary" showZero>
                      <FavoriteIcon sx={{ fontSize: 20 }} />
                    </Badge>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Wishlist
                    </Typography>
                  </Box>
                ) : item.text === 'Login' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LoginIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Login
                    </Typography>
                  </Box>
                ) : item.text === 'Logout' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LogoutIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Logout
                    </Typography>
                  </Box>
                ) : (
                  item.text
                )}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
