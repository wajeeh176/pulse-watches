import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Assuming you have AuthContext
import API from '../api/api';

export default function Checkout() {
  const { state, dispatch } = useCart();
  const { cartItems } = state;
  const { user, token } = useAuth(); // get logged-in user and token

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !address) {
      alert('Please fill all fields');
      return;
    }

    if (!cartItems.length) {
      alert('Your cart is empty');
      return;
    }

    // Prepare order in backend schema format
    const orderItems = cartItems.map(item => ({
      product: item._id,
      qty: item.qty,
      price: item.price,
    }));

    const shippingAddress = { name, email, address };

    try {
      await API.post('/orders', {
        orderItems,
        shippingAddress,
        paymentMethod: 'Cash on Delivery',
        totalPrice,
      }, {
        headers: { Authorization: `Bearer ${token}` }, // token required for protected route
      });

      dispatch({ type: 'CLEAR_CART' });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Order could not be placed');
    }
  };

  if (submitted)
    return (
      <div className="checkout-message">
        <h1>🎉 Thank You!</h1>
        <p>Your order has been placed successfully.</p>
      </div>
    );

  if (!cartItems.length)
    return (
      <div className="checkout-message">
        <h1>🛒 Your cart is empty</h1>
        <p>Add some products to proceed to checkout.</p>
      </div>
    );

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-grid">
        {/* Shipping Form */}
        <div className="checkout-card">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Street, City, Country"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-submit">
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="checkout-card checkout-summary">
          <h2>Order Summary</h2>
          <ul className="summary-list">
            {cartItems.map((item) => (
              <li key={item._id} className="summary-item">
                <img src={`/images/${item.images?.[0]}`} alt={item.title} />
                <div className="summary-details">
                  <span>{item.title} x {item.qty}</span>
                  <span>Rs. {item.price * item.qty}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="summary-total">Total: Rs. {totalPrice}</div>
        </div>
      </div>
    </div>
  );
}
