import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function Footer() {
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      {/* Newsletter Section */}
      <Box sx={{ 
        bgcolor: 'rgba(196, 151, 91, 0.05)', 
        py: 4,
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Subscribe to Our Newsletter
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get the latest updates on new products and exclusive offers!
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="form" onSubmit={handleSubscribe}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.default',
                        borderRadius: 2
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    sx={{ px: 4, borderRadius: 2 }}
                  >
                    Subscribe
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="h5" fontWeight={900} color="primary">
                  Pulse Watches
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 350 }}>
                Pakistan's premier destination for authentic luxury watches. We bring together authenticity, quality, and exceptional service to deliver the finest timepieces.
              </Typography>
              
              {/* Social Media */}
              <Box>
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      bgcolor: 'background.default',
                      transition: 'background-color 0.2s ease, color 0.2s ease',
                      willChange: 'background-color',
                      '&:hover': { 
                        bgcolor: 'primary.main', 
                        color: 'black',
                        willChange: 'background-color, color'
                      },
                      '&:not(:hover)': {
                        willChange: 'auto'
                      }
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      bgcolor: 'background.default',
                      transition: 'background-color 0.2s ease, color 0.2s ease',
                      willChange: 'background-color',
                      '&:hover': { 
                        bgcolor: 'primary.main', 
                        color: 'black',
                        willChange: 'background-color, color'
                      },
                      '&:not(:hover)': {
                        willChange: 'auto'
                      }
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      bgcolor: 'background.default',
                      transition: 'background-color 0.2s ease, color 0.2s ease',
                      willChange: 'background-color',
                      '&:hover': { 
                        bgcolor: 'primary.main', 
                        color: 'black',
                        willChange: 'background-color, color'
                      },
                      '&:not(:hover)': {
                        willChange: 'auto'
                      }
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      bgcolor: 'background.default',
                      transition: 'background-color 0.2s ease, color 0.2s ease',
                      willChange: 'background-color',
                      '&:hover': { 
                        bgcolor: 'primary.main', 
                        color: 'black',
                        willChange: 'background-color, color'
                      },
                      '&:not(:hover)': {
                        willChange: 'auto'
                      }
                    }}
                  >
                    <YouTubeIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Shop
            </Typography>
            <Stack spacing={1}>
              <Link 
                component={RouterLink} 
                to="/?section=men" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                Men's Watches
              </Link>
              <Link 
                component={RouterLink} 
                to="/?section=women" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                Women's Watches
              </Link>
              <Link 
                component={RouterLink} 
                to="/?section=new" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                New Arrivals
              </Link>
              <Link 
                component={RouterLink} 
                to="/?section=featured" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                Featured
              </Link>
            </Stack>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link 
                component={RouterLink} 
                to="/contact" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                Contact Us
              </Link>
              <Link 
                component={RouterLink} 
                to="/about" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                About Us
              </Link>
              <Link 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'all 0.2s',
                  '&:hover': { color: 'primary.main', pl: 0.5 },
                  cursor: 'pointer'
                }}
              >
                Shipping Info
              </Link>
              <Link 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'all 0.2s',
                  '&:hover': { color: 'primary.main', pl: 0.5 },
                  cursor: 'pointer'
                }}
              >
                Returns
              </Link>
              <Link 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'all 0.2s',
                  '&:hover': { color: 'primary.main', pl: 0.5 },
                  cursor: 'pointer'
                }}
              >
                FAQs
              </Link>
            </Stack>
          </Grid>

          {/* Account */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Account
            </Typography>
            <Stack spacing={1}>
              <Link 
                component={RouterLink} 
                to="/login" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                Login
              </Link>
              <Link 
                component={RouterLink} 
                to="/register" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                Register
              </Link>
              <Link 
                component={RouterLink} 
                to="/orders" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                My Orders
              </Link>
              <Link 
                component={RouterLink} 
                to="/cart" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  willChange: 'color',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(4px)',
                    willChange: 'color, transform'
                  },
                  '&:not(:hover)': {
                    willChange: 'auto'
                  }
                }}
              >
                Shopping Cart
              </Link>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Contact
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <PhoneIcon sx={{ fontSize: 20, color: 'primary.main', mt: 0.3 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    +92 300 1234567
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Mon-Sat 10AM-8PM
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <EmailIcon sx={{ fontSize: 20, color: 'primary.main', mt: 0.3 }} />
                <Typography variant="body2" color="text.secondary">
                  support@pulsewatches.pk
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <LocationOnIcon sx={{ fontSize: 20, color: 'primary.main', mt: 0.3 }} />
                <Typography variant="body2" color="text.secondary">
                  Karachi, Pakistan
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* Bottom Bar */}
      <Box sx={{ py: 3, bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ textAlign: { xs: 'center', md: 'left' } }}
              >
                © {new Date().getFullYear()} Pulse Watches. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack 
                direction="row" 
                spacing={2} 
                justifyContent={{ xs: 'center', md: 'flex-end' }}
                flexWrap="wrap"
              >
                <Link 
                  underline="hover" 
                  color="text.secondary" 
                  sx={{ 
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                    cursor: 'pointer'
                  }}
                >
                  Privacy Policy
                </Link>
                <Link 
                  underline="hover" 
                  color="text.secondary" 
                  sx={{ 
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                    cursor: 'pointer'
                  }}
                >
                  Terms of Service
                </Link>
                <Link 
                  underline="hover" 
                  color="text.secondary" 
                  sx={{ 
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                    cursor: 'pointer'
                  }}
                >
                  Cookie Policy
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

