import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const imageUrl = `images/${product.images?.[0] || "placeholder.png"}`;

  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-link">
        <div className="product-media">
          <img src={imageUrl} alt={product.title} />
        </div>
        <div className="product-body">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-price">Rs. {product.price}</div>
        </div>
      </Link>
    </article>
  );
}
