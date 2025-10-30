const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: String,
  description: String,
  price: { type: Number, required: true },
  countInStock: { type: Number, default: 0 },
  images: [String],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  category: String
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);
