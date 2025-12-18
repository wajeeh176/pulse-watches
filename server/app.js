const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

// CORS configuration - MUST come before routes
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Simple request logger for debugging
app.use((req, res, next) => {
  console.log('HTTP', req.method, req.originalUrl);
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers - configure Helmet to allow API access
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for API server
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Compression middleware
app.use(compression());

// API Routes - must come before static files
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found', path: req.path });
});

// Cache control for static assets
const cacheTime = 86400000 * 30; // 30 days
app.use(express.static('public', {
  maxAge: cacheTime
}));

app.use(errorHandler);

module.exports = app;
