// Vercel serverless function wrapper for Express app
const mongoose = require('mongoose');
require('dotenv').config();

// Cache MongoDB connection for serverless functions (reuse across invocations)
let cachedConnection = null;
let dbConnected = false;

async function connectDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0, // Disable mongoose buffering for serverless
      bufferCommands: false, // Disable mongoose buffering for serverless
    };

    if (mongoose.connection.readyState === 0) {
      cachedConnection = await mongoose.connect(process.env.MONGO_URI, mongoOptions);
      console.log('MongoDB connected to serverless function');
    }
    return cachedConnection || mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Load Express app
const app = require('../server/app');

// Serverless function handler
module.exports = async (req, res) => {
  // Connect to MongoDB if not already connected
  if (!dbConnected) {
    try {
      await connectDatabase();
      dbConnected = true;
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      return res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
  }

  // Handle the request with Express app
  return app(req, res);
};

