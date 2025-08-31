import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  getOrderStats
} from '../controllers/orderController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { validateOrder } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/', validateOrder, createOrder);

// Admin routes (protected)
router.get('/', authenticateAdmin, getAllOrders);
router.get('/stats', authenticateAdmin, getOrderStats);
router.get('/:id', authenticateAdmin, getOrder);
router.patch('/:id/status', authenticateAdmin, updateOrderStatus);

export default router;