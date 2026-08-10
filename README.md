# Vehicle Rental System API

## Live URL
**Live Deployment:** [https://vehicle-rental-system-backend-dun.vercel.app](https://vehicle-rental-system-backend-dun.vercel.app)

## Features
- **User Management & Authentication:** Secure Registration and Login with JWT-based authentication. Role-based access control for Admin and Customer.
- **Vehicle Management:** Full inventory management (CRUD) for vehicles including availability tracking and pricing.
- **Booking System:** Customers can rent vehicles with automatic cost calculation. Admins can manage all bookings and mark vehicles as returned.
- **Modular Architecture:** Clean code structure with proper separation of concerns (Routes, Controllers, Services).
- **Error Handling:** Centralized global error handling and validation using Zod.

## Technology Stack
- **Node.js** & **TypeScript**
- **Express.js** (Web Framework)
- **PostgreSQL** (Database)
- **Prisma** (ORM)
- **bcrypt** (Password Hashing)
- **jsonwebtoken** (JWT Authentication)
- **Zod** (Data Validation)

## Setup & Usage Instructions

### Prerequisites
- Node.js installed on your machine
- PostgreSQL database URL (e.g., from Neon, Supabase, or local setup)

### 1. Clone the repository
```bash
git clone https://github.com/Alok4D/vehicle-rental-system-backend.git
cd vehicle-rental-system-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables Configuration
Create a `.env` file in the root directory and add the following keys:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="your_postgresql_database_url_here"
JWT_ACCESS_SECRET="your_jwt_access_secret_here"
JWT_ACCESS_EXPIRES_IN="30d"
```

### 4. Database Setup (Prisma)
Run the following commands to generate the Prisma client and push the schema to your database:
```bash
npx prisma generate
npx prisma db push
```

### 5. Start the Server
To run the server in development mode:
```bash
npm run dev
```
The server will start running at `http://localhost:5000`

## API Endpoints & Testing
To make testing easier, a Postman collection is included in the project repository.
- **Path:** `src/postman/Vehicle_Rental_Collection.postman_collection.json`
- Simply import this file into your Postman application to test all the available endpoints.
