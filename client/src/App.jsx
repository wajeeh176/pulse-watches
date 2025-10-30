import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/AdminRoute';
import About from './pages/About';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin routes don't show navbar/footer
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path='/admin/*' element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>
      </Routes>
    );
  }

  // Public routes with navbar/footer
  return (
    <div className='app-root'>
      <Navbar />
      <main className='page-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:slug' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route
            path='/checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path='/orders'
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
