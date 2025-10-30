// client/src/pages/Product.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api/api';
import '../styles/index.css'; // optional: your CSS

export default function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    API.get(`/products/${slug}`)
      .then((res) => {
        setProduct(res.data);
        console.log('Product image:', res.data.images?.[0]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container">Loading...</div>;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="container product-page">
      <div className="product-grid">
        <div className="product-media-large">
          <img
            src={`/images/${product.images?.[0] || 'product1.png'}`}
            alt={product.title}
          />
        </div>
        <div className="product-details">
          <h1 className="product-title-lg">{product.title}</h1>
          <p className="product-desc">{product.description}</p>
          <div className="product-meta">
            <div className="price">Rs. {product.price}</div>
            <div className="stock">
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>
          <button
            className="btn primary"
            disabled={product.countInStock === 0}
            onClick={() => {
              dispatch({ type: 'ADD_ITEM', payload: product });
              alert('Added to cart!');
            }}
          >
            Add to cart
          </button>
          <div className="trust-box">
            <h4>Why buy from WatchStore?</h4>
            <ul>
              <li>Authentic brands & warranty</li>
              <li>Cash on Delivery across Pakistan</li>
              <li>Free shipping above Rs. 10,000</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
