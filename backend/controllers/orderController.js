import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: "Shipping address and payment method are required" });
    }

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      return res.status(400).json({ message: "Shipping address must include address, city, postalCode, and country" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cart.items.reduce((sum, item) => {
      const price = item.product.discountedPrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.discountedPrice || item.product.price,
      name: item.product.name
    }));

    const orderNumber = await Order.generateOrderNumber();

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: total,
      shippingAddress,
      paymentMethod,
      orderNumber,
      statusHistory: [{
        status: 'pending',
        timestamp: new Date(),
        note: 'Order created'
      }]
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: "Error creating order" });
  }
};

// Get user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 })
      .exec();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 15 } = req.query;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate("items.product")
      .populate("user", "name email")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .exec();

    const total = await Order.countDocuments();

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      totalOrders: total
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const previousStatus = order.status;
    const newStatus = req.body.status.toLowerCase();

    if (!order.schema.path('status').enumValues.includes(newStatus)) {
      return res.status(400).json({ 
        message: "Invalid status. Must be one of: " + order.schema.path('status').enumValues.join(', ')
      });
    }

    order.status = newStatus;
    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date(),
      note: req.body.note || `Status updated to ${newStatus}`
    });

    if (newStatus === "cancelled" && previousStatus !== "cancelled") {
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: "Error updating order status" });
  }
};

// Track order status
export const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        message: "Order tracking number is required"
      });
    }

    const order = await Order.findOne({ orderNumber: orderId })
      .select('status createdAt updatedAt orderNumber statusHistory items totalAmount')
      .lean()
      .exec();

    if (!order) {
      return res.status(404).json({
        message: "Order not found. Please check your tracking number and try again."
      });
    }

    const statusInfo = {
      pending: {
        emoji: "🕒",
        message: "Order is being processed",
        progress: 20
      },
      confirmed: {
        emoji: "✅",
        message: "Order confirmed",
        progress: 40
      },
      shipped: {
        emoji: "📦",
        message: "Order is on the way",
        progress: 60
      },
      outForDelivery: {
        emoji: "🚚",
        message: "Out for delivery",
        progress: 80
      },
      delivered: {
        emoji: "🎉",
        message: "Order delivered",
        progress: 100
      },
      cancelled: {
        emoji: "❌",
        message: "Order cancelled",
        progress: 0
      }
    };

    const currentStatus = order.status.toLowerCase();
    const orderStatus = statusInfo[currentStatus] || {
      emoji: "❓",
      message: "Status unknown",
      progress: 0
    };

    const response = {
      orderNumber: order.orderNumber,
      status: currentStatus,
      emoji: orderStatus.emoji,
      message: orderStatus.message,
      progress: orderStatus.progress,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      totalAmount: order.totalAmount,
      timeline: order.statusHistory?.map(history => ({
        status: history.status,
        timestamp: history.timestamp,
        note: history.note
      })) || []
    };

    res.json(response);
  } catch (error) {
    console.error('Order tracking error:', error);
    res.status(500).json({
      message: "Unable to track order. Please try again or contact support."
    });
  }
};