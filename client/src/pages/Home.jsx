import React, {useEffect, useState} from 'react'
import API from '../api/api'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { useLocation } from 'react-router-dom'

function useQuery(){ return new URLSearchParams(useLocation().search) }

export default function Home(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const q = useQuery()
  const section = q.get('section') || 'featured'

useEffect(() => {
  setLoading(true);
  API.get("/products")
    .then((res) => {
      console.log("Fetched products:", res.data); // 👈 Add this
      setProducts(res.data || []);
    })
    .catch((e) => console.error(e))
    .finally(() => setLoading(false));
}, []);


  const filterBy = (cat) => {
    if(cat === 'featured') return products.slice(0,8)
    if(cat === 'men') return products.filter(p=> (p.category||'').toLowerCase().includes('men'))
    if(cat === 'women') return products.filter(p=> (p.category||'').toLowerCase().includes('women'))
    if(cat === 'new') return products.slice(0,8).reverse()
    return products
  }

  const list = filterBy(section)

  return (
    <div>
      <Hero title='Discover Premium Watches' subtitle='Top brands • Genuine • Fast delivery in Pakistan' />
      <div className='container'>
        <section className='section-head'><h2>{section === 'featured' ? 'Featured Watches' : section === 'men' ? "Men's Collection" : section === 'women' ? "Women's Collection" : 'New Arrivals'}</h2></section>
        {loading ? <div className='loading'>Loading…</div> : (
          <section className='grid'>
            {list.map(p=> <ProductCard key={p._id} product={p} />)}
            {list.length === 0 && <div>No products in this section.</div>}
          </section>
        )}
      </div>
    </div>
  )
}
