import express from 'express';
import {
  getAllFirecrackers,
  getFirecracker,
  createFirecracker,
  updateFirecracker,
  deleteFirecracker,
  deactivateFirecracker,
  getCategories
} from '../controllers/firecrackerController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { validateFirecracker } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllFirecrackers);
router.get('/categories', getCategories);
router.get('/:id', getFirecracker);

// Admin routes (protected)
router.post('/', authenticateAdmin, validateFirecracker, createFirecracker);
router.put('/:id', authenticateAdmin, validateFirecracker, updateFirecracker);
router.delete('/:id', authenticateAdmin, deleteFirecracker);
router.patch('/:id/deactivate', authenticateAdmin, deactivateFirecracker);

export default router;