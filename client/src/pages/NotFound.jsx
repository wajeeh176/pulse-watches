import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function NotFound(){
  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h2" fontWeight={900}>404</Typography>
      <Typography variant="h6" color="text.secondary">Page not found</Typography>
    </Container>
  )
}


