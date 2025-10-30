import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { PrivateRoute } from './components/PrivateRoute';
import AdminOrders from "./pages/AdminOrders";

// inside <Routes>
<Route path="/admin/orders" element={<AdminOrders />} />





export default function App() {
  return (
    <div className='app-root'>
      <Navbar />
      <main className='page-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:slug' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route
            path='/checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />         {/* Added */}
          <Route path='/register' element={<Register />} />   {/* Added */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
