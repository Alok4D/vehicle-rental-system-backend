import { z } from 'zod';

const createVehicleValidationSchema = z.object({
  body: z.object({
    vehicle_name: z.string({
      required_error: 'Vehicle name is required',
    }),
    type: z.enum(['car', 'bike', 'van', 'SUV'], {
      required_error: 'Vehicle type is required',
    }),
    registration_number: z.string({
      required_error: 'Registration number is required',
    }),
    daily_rent_price: z.number({
      required_error: 'Daily rent price is required',
    }).positive('Price must be positive'),
    availability_status: z.enum(['available', 'booked']).optional(),
  }),
});

const updateVehicleValidationSchema = z.object({
  body: z.object({
    vehicle_name: z.string().optional(),
    type: z.enum(['car', 'bike', 'van', 'SUV']).optional(),
    registration_number: z.string().optional(),
    daily_rent_price: z.number().positive('Price must be positive').optional(),
    availability_status: z.enum(['available', 'booked']).optional(),
  }),
});

export const VehicleValidation = {
  createVehicleValidationSchema,
  updateVehicleValidationSchema,
};