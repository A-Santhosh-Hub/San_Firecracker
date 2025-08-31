import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

export const validateAdminPassword = (password) => {
  return password === process.env.ADMIN_PASSWORD;
};

export const generateAdminToken = () => {
  return jwt.sign(
    { role: 'admin', timestamp: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};