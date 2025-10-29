import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { 
    type: String, 
    unique: true,
    required: true 
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
      price: { type: Number }, // Store price at time of order
      name: { type: String }   // Store product name at time of order
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  paymentMethod: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'shipped', 'outForDelivery', 'delivered', 'cancelled'],
    default: "pending" 
  },
  statusHistory: [{
    status: { type: String },
    timestamp: { type: Date },
    note: { type: String }
  }]
}, { timestamps: true });

// Generate order number
// Static method to generate next order number
orderSchema.statics.generateOrderNumber = async function() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Find the latest order from today
  const latestOrder = await this.findOne({
    orderNumber: new RegExp(`JAM${year}${month}${day}`)
  }).sort({ orderNumber: -1 });

  let sequence = '0001';
  if (latestOrder) {
    const currentSequence = parseInt(latestOrder.orderNumber.slice(-4));
    sequence = String(currentSequence + 1).padStart(4, '0');
  }

  return `JAM${year}${month}${day}${sequence}`;
};

// Add initial status to history on save
orderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.statusHistory = [{
      status: this.status,
      timestamp: new Date(),
      note: 'Order created'
    }];
  }
  next();
});

// Add method to update status with history
orderSchema.methods.updateStatus = async function(newStatus, note = '') {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    note: note
  });
  return this.save();
};

export default mongoose.model("Order", orderSchema);
