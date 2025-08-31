import mongoose from 'mongoose';

const firecrackerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Firecracker name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function(value) {
        return Number.isFinite(value) && value >= 0;
      },
      message: 'Price must be a valid positive number'
    }
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: function(value) {
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return urlPattern.test(value);
      },
      message: 'Please provide a valid image URL'
    }
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['sparklers', 'fountains', 'rockets', 'ground-spinners', 'flower-pots', 'bombs', 'aerial-shots', 'others'],
    default: 'others'
  },
  stock: {
    type: Number,
    default: 100,
    min: [0, 'Stock cannot be negative']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
firecrackerSchema.index({ name: 1 });
firecrackerSchema.index({ price: 1 });
firecrackerSchema.index({ category: 1 });
firecrackerSchema.index({ isActive: 1 });

// Virtual for formatted price
firecrackerSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price.toFixed(2)}`;
});

// Pre-save middleware to ensure data consistency
firecrackerSchema.pre('save', function(next) {
  if (this.price) {
    this.price = Math.round(this.price * 100) / 100; // Round to 2 decimal places
  }
  next();
});

const Firecracker = mongoose.model('Firecracker', firecrackerSchema);

export default Firecracker;