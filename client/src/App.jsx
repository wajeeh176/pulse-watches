import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Orders = lazy(() => import('./pages/Orders'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Loading fallback component
  const LoadingFallback = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress />
    </Box>
  );

  // Admin routes don't show navbar/footer
  if (isAdminRoute) {
    return (
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
    );
  }

  // Public routes with navbar/footer
  return (
    <div className='app-root'>
      <Navbar />
      <main className='page-container'>
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
