import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { seedDatabase } from './utils/seedData.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { generalLimiter, adminLimiter, loginLimiter, securityHeaders } from './middleware/security.js';

// Import routes
import firecrackerRoutes from './routes/firecrackers.js';
import orderRoutes from './routes/orders.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Security middleware
app.use(securityHeaders);

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', generalLimiter);
app.use('/api/admin/', adminLimiter);
app.use('/api/auth/admin/login', loginLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'SanCrackers API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/firecrackers', firecrackerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Serve static files (for uploaded images)
app.use('/uploads', express.static('uploads'));

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to SanCrackers API',
    version: '1.0.0',
    endpoints: {
      firecrackers: {
        'GET /api/firecrackers': 'Get all firecrackers',
        'GET /api/firecrackers/:id': 'Get single firecracker',
        'POST /api/firecrackers': 'Create firecracker (Admin)',
        'PUT /api/firecrackers/:id': 'Update firecracker (Admin)',
        'DELETE /api/firecrackers/:id': 'Delete firecracker (Admin)'
      },
      orders: {
        'POST /api/orders': 'Create new order',
        'GET /api/orders': 'Get all orders (Admin)',
        'GET /api/orders/:id': 'Get single order (Admin)',
        'PATCH /api/orders/:id/status': 'Update order status (Admin)'
      },
      auth: {
        'POST /api/auth/admin/login': 'Admin login',
        'GET /api/auth/admin/verify': 'Verify admin token'
      }
    },
    documentation: 'Visit /api for endpoint details'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Seed database with default data
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log('🚀 SanCrackers Backend Server Started');
      console.log(`📍 Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
      console.log('🎆 Ready to serve firecracker data!');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

startServer();