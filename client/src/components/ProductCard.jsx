import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export default function ProductCard({ product }) {
  const imageUrl = `images/${product.images?.[0] || "placeholder.png"}`;
  const inStock = product.countInStock > 0;

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%', 
        backgroundImage: theme => `linear-gradient(180deg, ${theme.palette.action.hover}, transparent)`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 4
        }
      }}
    >
      <CardActionArea component={RouterLink} to={`/product/${product.slug}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
        <Box sx={{ position: 'relative', width: '100%' }}>
          {!inStock && (
            <Chip 
              label="Out of Stock" 
              size="small" 
              color="error" 
              sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }} 
            />
          )}
          <CardMedia 
            component="img" 
            image={imageUrl} 
            alt={product.title} 
            sx={{ 
              height: 220, 
              objectFit: 'contain', 
              p: 2,
              bgcolor: 'rgba(255,255,255,0.01)'
            }} 
          />
        </Box>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3em'
          }}>
            {product.title}
          </Typography>
          <Typography variant="h6" color="primary" fontWeight={800}>
            Rs. {product.price?.toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
