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
    enum: ['Pending', 'Confirmed', 'Shipped', 'OutForDelivery', 'Delivered', 'Cancelled'],
    default: "Pending" 
  },
  statusHistory: [{
    status: { type: String },
    timestamp: { type: Date },
    note: { type: String }
  }]
}, { timestamps: true });

// Generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model("Order").countDocuments();
    const date = new Date();
    this.orderNumber = `JAM${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(count + 1).padStart(4, '0')}`;
    
    // Add initial status to history
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
