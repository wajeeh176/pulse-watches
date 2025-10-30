import React, {useEffect, useState} from 'react'
import API from '../api/api'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

function useQuery(){ return new URLSearchParams(useLocation().search) }

export default function Home(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const q = useQuery()
  const section = q.get('section') || 'featured'
  const searchQ = (q.get('q') || '').toLowerCase()
  const [sort, setSort] = useState('popular')

  useEffect(() => {
    setLoading(true);
    API.get("/products")
      .then((res) => {
        setProducts(res.data || []);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const filterBy = (cat) => {
    let base = products
    if (cat === 'featured') base = products.slice(0, 12)
    if (cat === 'men') base = products.filter(p => (p.category || '').toLowerCase().includes('men'))
    if (cat === 'women') base = products.filter(p => (p.category || '').toLowerCase().includes('women'))
    if (cat === 'new') base = products.slice(0, 12).reverse()
    if (searchQ) base = base.filter(p => `${p.title} ${p.description}`.toLowerCase().includes(searchQ))
    if (sort === 'price-asc') base = [...base].sort((a,b)=>a.price-b.price)
    if (sort === 'price-desc') base = [...base].sort((a,b)=>b.price-a.price)
    return base
  }

  const list = filterBy(section)
  const title = section === 'featured' ? 'Featured Watches' : section === 'men' ? "Men's Collection" : section === 'women' ? "Women's Collection" : 'New Arrivals'

  const categories = [
    { name: "Men's Watches", img: '/images/rolex.png', link: '/?section=men' },
    { name: "Women's Watches", img: '/images/tissot.png', link: '/?section=women' },
    { name: 'Luxury Collection', img: '/images/patek.png', link: '/?section=featured' },
    { name: 'New Arrivals', img: '/images/citizen.png', link: '/?section=new' },
  ]

  return (
    <div>
      <Hero title='Discover Premium Watches' subtitle='Authentic timepieces from world-renowned brands • Fast delivery across Pakistan' />
      
      {/* Featured Categories */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={800} align="center" gutterBottom>Shop by Category</Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Explore our curated collections
        </Typography>
        <Grid container spacing={3}>
          {categories.map((cat, idx) => (
            <Grid item xs={6} sm={6} md={3} key={idx}>
              <Card 
                component={RouterLink} 
                to={cat.link}
                sx={{ 
                  textDecoration: 'none',
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={cat.img}
                  alt={cat.name}
                  sx={{ objectFit: 'contain', p: 2, bgcolor: 'rgba(255,255,255,0.02)' }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} align="center">
                    {cat.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* Promotional Banner */}
      <Box sx={{ bgcolor: 'primary.main', color: 'black', py: 3 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight={800}>Limited Time Offer</Typography>
              <Typography variant="body1">Get free shipping on orders above Rs. 10,000</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button variant="contained" sx={{ bgcolor: 'black', color: 'primary.main', '&:hover': { bgcolor: '#333' } }}>
                Shop Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider />

      {/* Products Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800}>{title}</Typography>
            {searchQ && <Typography variant="body2" color="text.secondary">Search: "{searchQ}"</Typography>}
          </Box>
          <TextField select size="small" label="Sort by" value={sort} onChange={(e)=>setSort(e.target.value)} sx={{ minWidth: 180 }}>
            <MenuItem value="popular">Most popular</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={['featured','men','women','new'].indexOf(section)} onChange={(e, idx)=>{
            const next = ['featured','men','women','new'][idx] || 'featured'
            window.history.pushState({}, '', `/?section=${next}${searchQ?`&q=${encodeURIComponent(searchQ)}`:''}`)
          }} variant="scrollable" allowScrollButtonsMobile>
            <Tab label="Featured" />
            <Tab label="Men's" />
            <Tab label="Women's" />
            <Tab label="New" />
          </Tabs>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {list.map(p=> (
              <Grid item key={p._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={p} />
              </Grid>
            ))}
            {list.length === 0 && (
              <Grid item xs={12}>
                <Typography align="center" sx={{ py: 4 }}>No products in this section.</Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>

      {/* Trust Indicators */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary.main" fontWeight={900}>100%</Typography>
              <Typography variant="subtitle1" fontWeight={700}>Authentic</Typography>
              <Typography variant="body2" color="text.secondary">Genuine products only</Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary.main" fontWeight={900}>24/7</Typography>
              <Typography variant="subtitle1" fontWeight={700}>Support</Typography>
              <Typography variant="body2" color="text.secondary">Always here to help</Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary.main" fontWeight={900}>Fast</Typography>
              <Typography variant="subtitle1" fontWeight={700}>Delivery</Typography>
              <Typography variant="body2" color="text.secondary">Pakistan-wide shipping</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}
