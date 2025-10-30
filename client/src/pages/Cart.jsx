import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { state, dispatch } = useCart();
  const { cartItems } = state;

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go Shopping</Link></p>
      ) : (
        <div className="cart-grid">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={`/images/${item.images?.[0]}`} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Rs. {item.price}</p>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={e =>
                    dispatch({ type: "UPDATE_QTY", payload: { _id: item._id, qty: +e.target.value } })
                  }
                />
                <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item._id })}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: Rs. {totalPrice}</h2>
            <Link to="/checkout" className="btn primary">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
