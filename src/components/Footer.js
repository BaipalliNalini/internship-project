import React from 'react';
import { Box, Grid, Typography, Link,IconButton} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';  // Formerly Twitter (you may substitute with TwitterIcon depending on the version!)
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#212121', color: 'white', mt: 3, pt: 6, pb: 3 }}>
      
        <Grid container spacing={7} alignItems="flex-start"sx={{mx:5}}>
          {/* About Us */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '2.5rem',m:0 }}>About</Typography>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Contact Us</Link><br />
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>About Us</Link><br />
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Flikart Stories</Link><br />
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Careers</Link><br/>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Press</Link><br/>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Corporate Information</Link>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '2.5rem',m:0 }}>Support</Typography>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Help Center</Link><br />
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Shipping</Link><br />
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Cancellation & Returns</Link><br />
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Refund Policy</Link><br />
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>Track Order</Link>
          </Grid>
          {/* companies */}
          <Grid item xs={12} sm={3}>
  <Typography variant="h6" gutterBottom sx={{ fontSize: '2.5rem', m: 0 }}>
    Group Companies
  </Typography>
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    Myntra
  </Link><br />
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    Cleartrip
  </Link><br />
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    Shopsy
  </Link>
</Grid>
{/*policy*/}
<Grid item xs={12} sm={3}>
  <Typography variant="h6" gutterBottom sx={{ fontSize: '2.5rem', m: 0 }}>
    Consumer Policy
  </Typography>
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    Cancellation & Returns
  </Link><br />
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    Terms Of Use
  </Link><br />
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    Security
  </Link><br />
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    Privacy
  </Link><br />
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    Sitemap
  </Link><br />
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    Grievance Redressal
  </Link><br />
  <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.2rem' }}>
    EPR Compliance
  </Link>
</Grid>

         <Box sx={{display:'flex',mx:7,gap:7}}>
          {/* mail */}
         <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '2.5rem',m:0 }}>Mail Us:</Typography>
            <Box sx={{ fontSize: '1.6rem', color: 'inherit' }}>
  <Typography>Flikart Internet Private Limited,</Typography>
  <Typography>Buildings Alyssa, Begonia &</Typography>
  <Typography>Clove Embassy Tech Village</Typography>
  <Typography>Outer Ring Road, Devarabeesanahalli Village,</Typography>
  <Typography>Bengaluru, 560103,</Typography>
  <Typography>Karnataka, India</Typography>
</Box>
{/* Social Media */}
<Typography variant="h6" gutterBottom sx={{ fontSize: '2.5rem' }}>Social</Typography>
<Box sx={{ display: 'flex', gap: 2, color: 'white' }}>
      <IconButton color="inherit">
        <FacebookIcon />
      </IconButton>
      <IconButton color="inherit">
        <XIcon />
      </IconButton>
      <IconButton color="inherit">
        <YouTubeIcon />
      </IconButton>
      <IconButton color="inherit">
        <InstagramIcon />
      </IconButton>
    </Box>
       </Grid>
               {/* Registeration Office */}
          <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: '2.5rem' }}>Registered Office Address</Typography>
            <Box sx={{ fontSize: '1.6rem', color: 'inherit' }}>
              <Typography>Flipkart Internet Private Limited,</Typography>
              <Typography>Buildings Alyssa, Begonia &</Typography>
              <Typography>Clove Embassy Tech Village</Typography>
              <Typography>Outer Ring Road, Devarabeesanahalli Village,</Typography>
              <Typography>Bengaluru, 560103,</Typography>
              <Typography>Karnataka, India</Typography>
              <Typography>CIN : U51109KA2012PTC066107</Typography>
              <Typography>
                Telephone: <Link href="tel:044-45614700" underline="hover" color="inherit">044-45614700</Link> /
                <Link href="tel:044-67415800" underline="hover" color="inherit"> 044-67415800</Link>
              </Typography>
          </Box>
          </Grid>
         </Box>
        
        </Grid>
        {/* Bottom Row */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 4,mx:4 }}>
          <Grid item>
            <Typography variant="body1" sx={{ color: 'white' }}>
              © {new Date().getFullYear()} ClosetNow. All rights reserved.
            </Typography>
          </Grid>
          <Grid item>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.4rem' }}>
              Terms of Service
            </Link>{' '}
            |{' '}
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '1.4rem' }}>
              Privacy Policy
            </Link>
          </Grid>
        </Grid>
    </Box>
  );
};

export default Footer;
