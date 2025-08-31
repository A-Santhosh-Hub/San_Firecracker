import express from 'express';
import { adminLogin, verifyAdminToken } from '../controllers/authController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { validateAdminLogin } from '../middleware/validation.js';

const router = express.Router();

// Admin authentication routes
router.post('/admin/login', validateAdminLogin, adminLogin);
router.get('/admin/verify', authenticateAdmin, verifyAdminToken);

export default router;