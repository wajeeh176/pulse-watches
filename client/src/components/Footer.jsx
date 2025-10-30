import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>WatchStore</h4>
          <p>Authentic watches • Delivery across Pakistan • Warranty supported</p>
        </div>
        <div>
          <h5>Customer Service</h5>
          <ul>
            <li>Contact</li>
            <li>Shipping</li>
            <li>Returns</li>
          </ul>
        </div>
        <div>
          <h5>Follow</h5>
          <ul>
            <li>Wajeeh</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">© {new Date().getFullYear()} WatchStore</div>
    </footer>
  );
}
