import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate limiting configuration
export const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// General API rate limit
export const generalLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  'Too many requests from this IP, please try again later.'
);

// Strict rate limit for admin routes
export const adminLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  20, // limit each IP to 20 requests per windowMs
  'Too many admin requests from this IP, please try again later.'
);

// Very strict rate limit for login attempts
export const loginLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 login attempts per windowMs
  'Too many login attempts from this IP, please try again after 15 minutes.'
);

// Security headers configuration
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false
});