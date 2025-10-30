const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: 'No items' });
  const order = await Order.create({
    user: req.user._id,
    orderItems, shippingAddress, paymentMethod, totalPrice
  });
  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
  res.json(orders);
};
