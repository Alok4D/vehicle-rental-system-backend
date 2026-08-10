# Refactor and Implementation Plan for Vehicle Rental System

This plan outlines the steps to transform the copied "University Management System" into the "Vehicle Rental System", maintaining your preferred directory structure while adapting it to the new requirements (PostgreSQL, new models, and specific APIs).

## ⚠️ User Review Required
> [!IMPORTANT]
> The copied project uses **MongoDB and Mongoose**. However, your assignment requirement clearly states **PostgreSQL**.
> To use PostgreSQL with TypeScript in this ecosystem, **Prisma ORM** is the most standard and widely used tool. I will remove Mongoose and install Prisma to connect to your PostgreSQL database. **Please confirm if you are okay with using Prisma.**

## Proposed Changes

### 1. Dependency Cleanup & Setup
- **[DELETE]** Uninstall `mongoose`, `mongodb`.
- **[NEW]** Install Prisma CLI (`prisma`) as a dev dependency, and `@prisma/client`.
- **[NEW]** Initialize Prisma schema for PostgreSQL.
- **[NEW]** Install `zod` for validation (if not already present and heavily used) and setup JWT/bcrypt.

### 2. File Removals (University System Cleanup)
I will delete the following directories which belong to the old project:
- `src/app/modules/Admin`
- `src/app/modules/Course`
- `src/app/modules/Faculty`
- `src/app/modules/OfferedCourse`
- `src/app/modules/SemesterRegistration`
- `src/app/modules/academicDepartment`
- `src/app/modules/academicFaculty`
- `src/app/modules/academicSemester`
- `src/app/modules/student`
- `src/app/modules/user` (Old Mongoose user)
- `src/app/modules/Auth` (Old Mongoose auth)

### 3. Server Configuration Updates
#### [MODIFY] [server.ts](file:///e:/NEXT%20LEVEL%20WORLD/L2-Assignment-02/vehicle-rental-system-backend/src/server.ts)
- Remove Mongoose connection logic.
- Directly start the Express server (Prisma connects automatically on first query).

#### [MODIFY] [app.ts](file:///e:/NEXT%20LEVEL%20WORLD/L2-Assignment-02/vehicle-rental-system-backend/src/app.ts)
- Update the default route `/` text from "University Management System" to "Vehicle Rental System API".

#### [MODIFY] [routes/index.ts](file:///e:/NEXT%20LEVEL%20WORLD/L2-Assignment-02/vehicle-rental-system-backend/src/app/routes/index.ts)
- Remove old routes.
- Wire up the new `auth`, `users`, `vehicles`, and `bookings` routes.

### 4. Database Schema (Prisma)
#### [NEW] [schema.prisma](file:///e:/NEXT%20LEVEL%20WORLD/L2-Assignment-02/vehicle-rental-system-backend/prisma/schema.prisma)
Define models according to your DB requirement:
- **User:** id, name, email, password, phone, role
- **Vehicle:** id, vehicle_name, type, registration_number, daily_rent_price, availability_status
- **Booking:** id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status

### 5. New Modules Implementation
I will create the following modules under `src/app/modules/` following the existing Controller -> Service -> Route pattern.

- **Auth Module (`src/app/modules/auth`)**
  - POST `/api/v1/auth/signup`
  - POST `/api/v1/auth/signin`
- **User Module (`src/app/modules/user`)**
  - GET `/api/v1/users`
  - PUT `/api/v1/users/:userId`
  - DELETE `/api/v1/users/:userId`
- **Vehicle Module (`src/app/modules/vehicle`)**
  - POST `/api/v1/vehicles`
  - GET `/api/v1/vehicles`
  - GET `/api/v1/vehicles/:vehicleId`
  - PUT `/api/v1/vehicles/:vehicleId`
  - DELETE `/api/v1/vehicles/:vehicleId`
- **Booking Module (`src/app/modules/booking`)**
  - POST `/api/v1/bookings`
  - GET `/api/v1/bookings`
  - PUT `/api/v1/bookings/:bookingId`

### 6. Middlewares
#### [NEW] [auth.ts](file:///e:/NEXT%20LEVEL%20WORLD/L2-Assignment-02/vehicle-rental-system-backend/src/app/middlewares/auth.ts)
- A middleware to verify JWT tokens and authorize based on roles (`admin` vs `customer`).

## Verification Plan
### Manual Verification
- After implementation, I will run the server locally.
- I will ask you to use Postman to test:
  - User Registration & Login
  - Creating a vehicle (Admin)
  - Creating a booking (Customer)
  - Testing Role-based Access (Admin vs Customer)
