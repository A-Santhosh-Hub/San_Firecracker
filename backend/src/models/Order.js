import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  firecrackerName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
    trim: true,
    validate: {
      validator: function(value) {
        const phonePattern = /^[+]?[\d\s\-\(\)]{10,15}$/;
        return phonePattern.test(value);
      },
      message: 'Please provide a valid phone number'
    }
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  whatsappSent: {
    type: Boolean,
    default: false
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// Indexes for better query performance
orderSchema.index({ customerPhone: 1 });
orderSchema.index({ orderDate: -1 });
orderSchema.index({ status: 1 });

// Virtual for order ID display
orderSchema.virtual('orderNumber').get(function() {
  return `SC${this._id.toString().slice(-6).toUpperCase()}`;
});

const Order = mongoose.model('Order', orderSchema);

export default Order;