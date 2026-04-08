# E-commerce Shop Project

## Overview
This repository contains a full-stack e-commerce application with a React/Vite frontend and an Express/MongoDB backend.

- `backend/` contains the Node.js Express API, authentication, product management, cart, orders, and chatbot integration.
- `frontend/` contains the React application built with Vite and Tailwind CSS.

---

## Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Create environment variables

Create a `.env` file in `backend/` and add the required values:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
HUGGINGFACE_API_KEY=your_huggingface_api_key
PORT=5000
```

Optional:

```env
OPENAI_API_KEY=your_openai_api_key
```

> Note: `OPENAI_API_KEY` is included in the repository environment file but is not required by the currently implemented backend routes.

### 3. Start the backend

```bash
npm start
```

or

```bash
npm run dev
```

The API will run on `http://localhost:5000` by default.

---

## Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start the frontend

```bash
npm run dev
```

By default, Vite will start the app on `http://localhost:5173`.

---

## Environment Variables

Backend environment variables used by the project:

- `MONGO_URI` - MongoDB connection string.
- `JWT_SECRET` - Secret key for signing JSON Web Tokens.
- `HUGGINGFACE_API_KEY` - Hugging Face API key used by the chatbot endpoint.
- `PORT` - Optional server port, defaults to `5000`.
- `OPENAI_API_KEY` - Optional key present in `.env`; currently not used by the backend logic.

---

## Backend API Routes

### User Routes

- `POST /api/users/register`
  - Register a new user.
  - Body: `{ name, email, password, ... }`

- `POST /api/users/login`
  - Authenticate user and receive a JWT.
  - Body: `{ email, password }`

- `GET /api/users/profile`
  - Get logged-in user profile.
  - Header: `Authorization: Bearer <token>`

- `GET /api/users/all`
  - Get all users (admin only).
  - Header: `Authorization: Bearer <token>`

- `PUT /api/users/:id`
  - Update a user (admin only).
  - Header: `Authorization: Bearer <token>`

- `DELETE /api/users/:id`
  - Delete a user (admin only).
  - Header: `Authorization: Bearer <token>`

### Product Routes

- `GET /api/products`
  - Get products with optional query filters.
  - Query params: `category`, `subcategory`, `brand`, `minPrice`, `maxPrice`, `search`, `featured`, `page`, `limit`, `sort`

- `POST /api/products`
  - Create a new product (admin only).
  - Header: `Authorization: Bearer <token>`

- `GET /api/products/:id`
  - Get a single product by ID.

- `PUT /api/products/:id`
  - Update a product (admin only).
  - Header: `Authorization: Bearer <token>`

- `DELETE /api/products/:id`
  - Delete a product (admin only).
  - Header: `Authorization: Bearer <token>`

- `GET /api/products/category/:category`
  - Get products by category.

- `GET /api/products/subcategory/:subcategory`
  - Get products by subcategory.

- `POST /api/products/upload`
  - Upload product images (admin only).
  - Header: `Authorization: Bearer <token>`
  - Form data field: `images`

### Cart Routes

- `GET /api/cart`
  - Get current user's cart.
  - Header: `Authorization: Bearer <token>`

- `POST /api/cart/add`
  - Add an item to cart.
  - Header: `Authorization: Bearer <token>`

- `DELETE /api/cart/remove/:productId`
  - Remove a product from cart.
  - Header: `Authorization: Bearer <token>`

### Order Routes

- `POST /api/orders`
  - Create a new order.
  - Header: `Authorization: Bearer <token>`

- `GET /api/orders`
  - Get orders for the logged-in user.
  - Header: `Authorization: Bearer <token>`

- `GET /api/orders/all`
  - Get all orders (admin only).
  - Header: `Authorization: Bearer <token>`

- `PUT /api/orders/:id/status`
  - Update order status (admin only).
  - Header: `Authorization: Bearer <token>`

- `GET /api/orders/:orderId/track`
  - Track an order by order ID.

### Chatbot Route

- `POST /api/chatbot`
  - Send a message to the chatbot.
  - Body: `{ message: string, history?: [{ sender, text }] }`

---

## Accessing Routes

Use a browser, Postman, or any HTTP client.

Example:

```bash
curl http://localhost:5000/api/products
```

Example with auth header:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/users/profile
```

---

## Notes

- The backend serves uploaded images from `http://localhost:5000/uploads/<filename>`.
- The frontend and backend run separately.
- If you want to run both concurrently, start backend and frontend in separate terminal windows.

---

## Folder Structure

- `backend/`
  - `controllers/` - API logic for products, users, orders, cart, chatbot
  - `models/` - Mongoose schemas
  - `routes/` - Express route definitions
  - `middleware/` - Auth and error handling
  - `config/db.js` - MongoDB connection
  - `server.js` - Express server entry point

- `frontend/`
  - React app built with Vite
  - `src/` contains components, pages, context, and styles

---

## Running the Project

1. Start backend

```bash
cd backend
npm install
npm run dev
```

2. Start frontend

```bash
cd frontend
npm install
npm run dev
```

3. Open the frontend URL shown by Vite (usually `http://localhost:5173`).
