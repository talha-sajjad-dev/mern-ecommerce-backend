
import express from 'express';
import cors from 'cors';
import config from './config/app.config.js';
import { AppError } from './utils/errors.util.js';
import errorHandler from './middleware/error-handler.middleware.js';
import security from './middleware/security.middleware.js';

// Route Imports
import categoryRoutes from './routes/category.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import brandRoutes from './routes/brand.routes.js';
import optionRoutes from './routes/option.routes.js';
import adminRoutes from './routes/admin.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();
// Security
app.use(security.helmet);
app.use(security.xss);
app.use(security.hpp);

// Rate limiting
app.use('/api', security.limiter);
app.use('/api/auth', security.authLimiter);

// CORS
app.use(cors(config.cors));

// Body parsing (must be before mongoSanitize so req.body exists for login etc.)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mongo sanitize (Express 5–safe: only body & params, does not touch req.query)
app.use(security.mongoSanitize);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

// 404
app.use((req, res, next) => {
  console.log('here');
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Error handler
app.use(errorHandler);

export default app;
