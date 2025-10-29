import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  // Validate required fields
  if (!shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: "Shipping address and payment method are required" });
  }

  // Validate shipping address structure
  if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
    return res.status(400).json({ message: "Shipping address must include address, city, postalCode, and country" });
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

  // Calculate total using discounted price if available, otherwise regular price
  const total = cart.items.reduce((sum, item) => {
    const price = item.product.discountedPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  // Transform cart items to include current product details
  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.discountedPrice || item.product.price,
    name: item.product.name
  }));

  // Generate order number first
  const orderNumber = await Order.generateOrderNumber();

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount: total,
    shippingAddress,
    paymentMethod,
    orderNumber, // Set the generated order number
  });

  // Clear the cart after successful order creation
  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.product");
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const { page = 1, limit = 15 } = req.query;

  const skip = (page - 1) * limit;
  const orders = await Order.find({})
    .populate("items.product")
    .populate("user", "name email")
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 }); // Sort by newest first

  const total = await Order.countDocuments();

  res.json({
    orders,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    totalOrders: total
  });
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product");
  if (!order) return res.status(404).json({ message: "Order not found" });

  const previousStatus = order.status;
  order.status = req.body.status;

  // If order is being cancelled, restore stock
  if (req.body.status === "Cancelled" && previousStatus !== "Cancelled") {
    for (const item of order.items) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
  }

  await order.save();
  res.json(order);
};

export const getOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Try to find order by ID or order number
    const order = await Order.findOne({
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(orderId) ? orderId : null },
        { orderNumber: orderId }
      ]
    })
    .select('status createdAt updatedAt orderNumber statusHistory items totalAmount')
    .lean();
    
    if (!order) {
      return res.status(404).json({ 
        message: "Order not found. Please check your order number and try again."
      });
    }

    // Define status information with emojis and progress percentage
    const statusInfo = {
      pending: {
        emoji: "🕒",
        message: "Order is being processed",
        progress: 20,
        description: "We've received your order and are processing it"
      },
      confirmed: {
        emoji: "✅",
        message: "Order confirmed",
        progress: 40,
        description: "Your order has been confirmed and is being prepared"
      },
      shipped: {
        emoji: "📦",
        message: "Order is on the way",
        progress: 60,
        description: "Your order has been shipped and is on its way"
      },
      outForDelivery: {
        emoji: "🚚",
        message: "Out for delivery",
        progress: 80,
        description: "Your order is out for delivery today"
      },
      delivered: {
        emoji: "🎉",
        message: "Order delivered",
        progress: 100,
        description: "Your order has been delivered successfully"
      },
      cancelled: {
        emoji: "❌",
        message: "Order cancelled",
        progress: 0,
        description: "This order has been cancelled"
      }
    };

    const orderStatus = statusInfo[order.status.toLowerCase()] || {
      emoji: "❓",
      message: "Status unknown",
      progress: 0,
      description: "Unable to determine order status"
    };

    // Format the status history
    const timeline = order.statusHistory.map(history => ({
      status: history.status,
      timestamp: history.timestamp,
      note: history.note
    }));

    res.json({
      orderNumber: order.orderNumber,
      status: order.status,
      emoji: orderStatus.emoji,
      message: orderStatus.message,
      description: orderStatus.description,
      progress: orderStatus.progress,
      timeline: timeline,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      totalAmount: order.totalAmount,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    });
  } catch (error) {
    console.error('Order tracking error:', error);
    res.status(500).json({ 
      message: "Unable to track order. Please try again or contact support.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
