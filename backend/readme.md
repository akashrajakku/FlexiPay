# Backend Structure

FlexiPay is a robust backend system for a financial application, providing user authentication, account management, and fund transfer capabilities.

## Features

- User registration and authentication
- Account balance management
- Secure fund transfers between accounts
- User search functionality
- JWT-based authentication
- Password hashing for security

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Bcrypt for password hashing
- Zod for input validation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/flexipay.git
   cd flexipay/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content: (you can use your own secret key)
   ```
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```
   node index.js
   ```

The server will start running on `http://localhost:3000`.

## API Endpoints

### User Routes

- POST `/api/v1/user/signup`: Register a new user
- POST `/api/v1/user/login`: User login
- PUT `/api/v1/user`: Update user information (protected)
- GET `/api/v1/user/bulk`: Search users by name

### Account Routes

- GET `/api/v1/account/balance`: Get account balance (protected)
- POST `/api/v1/account/transfer`: Transfer funds (protected)

## Code Structure

- `index.js`: Main server file
- `db.js`: Database connection and schema definitions
- `routes/`: Contains route handlers
- `middlewares/`: Custom middleware (e.g., authentication)
- `utils/`: Utility functions (e.g., password hashing)

## Security Measures

- Passwords are hashed using bcrypt
- JWT for secure authentication
- Input validation using Zod
- MongoDB transactions for secure fund transfers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
