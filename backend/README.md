# SanCrackers Backend API

A robust Node.js backend for the SanCrackers firecracker collection website.

## Features

- **RESTful API** for firecracker management
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for admin access
- **Input Validation** with Joi
- **Rate Limiting** for security
- **Error Handling** middleware
- **CORS** configuration
- **Security Headers** with Helmet
- **Database Seeding** with default data

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Public Endpoints

#### Firecrackers
- `GET /api/firecrackers` - Get all active firecrackers
- `GET /api/firecrackers/:id` - Get single firecracker
- `GET /api/firecrackers/categories` - Get all categories

#### Orders
- `POST /api/orders` - Create new order

### Admin Endpoints (Requires Authentication)

#### Authentication
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/admin/verify` - Verify admin token

#### Firecracker Management
- `POST /api/firecrackers` - Create new firecracker
- `PUT /api/firecrackers/:id` - Update firecracker
- `DELETE /api/firecrackers/:id` - Delete firecracker
- `PATCH /api/firecrackers/:id/deactivate` - Deactivate firecracker

#### Order Management
- `GET /api/orders` - Get all orders with pagination
- `GET /api/orders/stats` - Get order statistics
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/status` - Update order status

## Database Schema

### Firecracker Model
```javascript
{
  name: String (required, max 100 chars),
  price: Number (required, positive),
  image: String (required, valid URL),
  description: String (optional, max 500 chars),
  category: String (enum),
  stock: Number (default 100),
  isActive: Boolean (default true),
  timestamps: true
}
```

### Order Model
```javascript
{
  customerName: String (required, max 100 chars),
  customerPhone: String (required, valid format),
  items: Array of OrderItems,
  totalAmount: Number (required, positive),
  status: String (enum),
  whatsappSent: Boolean (default false),
  orderDate: Date (default now),
  notes: String (optional, max 1000 chars),
  timestamps: true
}
```

## Security Features

- **Rate Limiting**: Different limits for general API, admin routes, and login attempts
- **Input Validation**: Comprehensive validation using Joi
- **Security Headers**: Implemented with Helmet
- **CORS Protection**: Configured for specific frontend origin
- **JWT Authentication**: Secure admin access with token expiration
- **Error Handling**: Comprehensive error responses without sensitive data exposure

## Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/sancrackers
DB_NAME=sancrackers

# Server
PORT=5000
NODE_ENV=development

# Authentication
ADMIN_PASSWORD=1922K1396santhosh*
JWT_SECRET=your_super_secret_jwt_key

# CORS
FRONTEND_URL=http://localhost:5173
```

## Development

### Database Seeding
The server automatically seeds the database with default firecracker data on first run.

### Error Handling
All routes include comprehensive error handling with appropriate HTTP status codes and user-friendly messages.

### Logging
The server includes detailed logging for debugging and monitoring.

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a secure JWT secret
3. Configure MongoDB connection for production
4. Set up proper CORS origins
5. Consider using PM2 for process management

## API Testing

Use tools like Postman or curl to test the API endpoints:

```bash
# Get all firecrackers
curl http://localhost:5000/api/firecrackers

# Admin login
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"1922K1396santhosh*"}'
```

## Support

For issues or questions, contact: Santhosh_A

---
**SanCrackers Backend** - Built with ❤️ for festive celebrations!