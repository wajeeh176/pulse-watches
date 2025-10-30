import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link as RouterLink } from 'react-router-dom'

export default function Hero({ title = 'Luxury Watches', subtitle = 'Premium collections' }){
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        backgroundImage: "linear-gradient(135deg, rgba(14,14,16,0.85) 0%, rgba(14,14,16,0.70) 100%), url('/images/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: { xs: '400px', md: '500px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="overline" 
          sx={{ 
            color: 'primary.main', 
            letterSpacing: 3, 
            fontWeight: 700,
            mb: 2,
            display: 'block',
            fontSize: { xs: '0.75rem', md: '0.875rem' }
          }}
        >
          PREMIUM COLLECTION
        </Typography>
        <Typography 
          variant="h1" 
          fontWeight={900} 
          sx={{ 
            color: 'white',
            mb: 3,
            fontSize: { xs: '2.5rem', md: '4rem' },
            lineHeight: 1.1
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255,255,255,0.85)',
            mb: 5,
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          {subtitle}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={2}>
          <Button 
            component={RouterLink} 
            to="/?section=featured" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ px: 5, py: 1.8, fontWeight: 700, fontSize: '1.1rem' }}
          >
            Shop Now
          </Button>
          <Button 
            component={RouterLink} 
            to="/?section=new" 
            variant="outlined" 
            size="large"
            sx={{ 
              px: 5, 
              py: 1.8, 
              fontWeight: 700,
              fontSize: '1.1rem',
              borderColor: 'rgba(255,255,255,0.4)',
              color: 'white',
              borderWidth: 2,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(196,151,91,0.15)',
                borderWidth: 2
              }
            }}
          >
            New Arrivals
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
