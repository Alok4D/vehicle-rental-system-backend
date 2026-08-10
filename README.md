# Vehicle Rental System API

A robust backend application for a Vehicle Rental System built using Node.js, Express, TypeScript, PostgreSQL, and Prisma ORM.

## Live URL
**Live API Link:** [https://vehicle-rental-system-backend-dun.vercel.app](https://vehicle-rental-system-backend-dun.vercel.app)

## How to Test the API

To make it easy for testing, a Postman Collection is included in the repository.

1. **Download Postman Collection:** You can find the Postman collection file in `src/postman/Vehicle_Rental_Collection.postman_collection.json`.
2. **Import in Postman:** Open Postman -> Click **Import** -> Select the downloaded file.
3. **Run Requests:** All 13 endpoints are configured with the required request body and headers. Just change the base URL to the live URL above to test.

### Sample Test Credentials
You can use these credentials to quickly test role-based authentication without creating a new user:

**Admin User:**
- Email: `admin@example.com`
- Password: `securePassword123`

*(Note: If the user doesn't exist, please run the Signup API first to create it, then use the Signin API to get the JWT token).*

## Technology Stack
- **Framework:** Express.js (Node.js)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel

## Core Features
1. **User Management & Authentication**
   - User Registration (Signup) & Login (Signin)
   - JWT-based authentication
   - Role-based authorization (`admin`, `customer`)
   - Profile management (View/Update)

2. **Vehicle Management**
   - Add, View, Update, and Delete vehicles
   - View details of a specific vehicle

3. **Booking System**
   - Book a vehicle
   - View all bookings for a user
   - Admin can view all bookings
   - Return a vehicle (Admin updates booking status & calculates final cost)

4. **Error Handling**
   - Global Error Handler for consistent error responses
   - Not Found (404) route handler
   - Validation error formatting using Zod

## Local Setup Instructions

### Prerequisites
- Node.js installed
- PostgreSQL database URL (e.g., Neon, Supabase, or local pgAdmin)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Alok4D/vehicle-rental-system-backend.git
   cd vehicle-rental-system-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="your_postgresql_database_url_here"
   JWT_ACCESS_SECRET="your_jwt_access_secret"
   JWT_ACCESS_EXPIRES_IN="30d"
   ```

4. Generate Prisma Client & Push Schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start running at `http://localhost:5000`
