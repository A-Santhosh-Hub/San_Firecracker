import { validateAdminPassword, generateAdminToken } from '../middleware/auth.js';

export const adminLogin = async (req, res) => {
  try {
    const { password } = req.validatedData;

    if (!validateAdminPassword(password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin password'
      });
    }

    const token = generateAdminToken();

    res.json({
      success: true,
      message: 'Admin login successful',
      data: {
        token,
        expiresIn: '24h'
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const verifyAdminToken = async (req, res) => {
  try {
    // If we reach here, the token is valid (middleware already verified it)
    res.json({
      success: true,
      message: 'Token is valid',
      data: {
        admin: req.admin
      }
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying token',
      error: error.message
    });
  }
};