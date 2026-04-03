# MERN E-commerce Platform — Backend

Production-ready REST API for a full-stack multi-vendor marketplace built with Node.js, Express.js, and MongoDB. Features a three-tier role system (Customer, Seller, Admin), real-time messaging, and complete payment processing.

🔗 **Live Demo:** https://talha-mern-shop.netlify.app/
📁 **Frontend Repo:** https://github.com/talha-sajjad-dev/mern-ecommerce-frontend

---

## Features

### Multi-Vendor System
- Sellers register and await admin approval (pending/approved/rejected flow)
- Each seller manages their own products, inventory, and orders independently
- Orders automatically split into sub-orders per seller with independent fulfillment status
- Seller revenue tracking, analytics, and payout settings

### Authentication & Security
- JWT authentication with role-based access control (Customer, Seller, Admin)
- Google OAuth social login
- OTP-based account recovery via email
- Rate limiting (express-rate-limit), input sanitization (express-mongo-sanitize, xss-clean, hpp), helmet

### Payments
- Stripe, PayPal, and Cash on Delivery (COD)
- Secure backend validation and webhook handling

### Real-Time Features
- Socket.IO chat between buyers and sellers
- File attachments, message reactions, read receipts
- Real-time notifications

### Admin Panel
- Approve/reject seller applications
- Manage users, products, categories, brands, coupons
- Handle disputes and return requests
- Set platform commission rates
- CMS content management and platform settings

### Architecture
- 100+ REST API endpoints
- Layered architecture: controllers → services → repositories
- 20+ Mongoose models
- Joi validation on all inputs
- Modular folder structure

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT, Google OAuth |
| Payments | Stripe, PayPal |
| Real-time | Socket.IO |
| Media | Cloudinary |
| Validation | Joi |
| Security | Helmet, express-rate-limit, xss-clean |
| Email | Nodemailer |

---

## API Routes

| Prefix | Description |
|---|---|
| `/api/auth` | Register, login, OTP, password reset |
| `/api/users` | User management |
| `/api/sellers` | Seller applications and profiles |
| `/api/admin` | Admin operations |
| `/api/products` | Product CRUD |
| `/api/orders` | Order management and sub-orders |
| `/api/payments` | Stripe, PayPal, COD processing |
| `/api/cart` | Shopping cart |
| `/api/chat` | Real-time messaging |
| `/api/reviews` | Product reviews |
| `/api/coupons` | Discount codes |
| `/api/dashboard` | Analytics for sellers and admin |

---

## Getting Started
```bash
# Clone the repo
git clone https://github.com/talha-sajjad-dev/mern-ecommerce-backend
cd mern-ecommerce-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Fill in your credentials in .env

# Seed the database (optional)
npm run seed

# Run in development
npm run dev
```

## Environment Variables

See `.env.example` for the full list. Key variables:
