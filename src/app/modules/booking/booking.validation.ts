import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    customer_id: z.number({
      required_error: 'Customer ID is required',
    }),
    vehicle_id: z.number({
      required_error: 'Vehicle ID is required',
    }),
    rent_start_date: z.string({
      required_error: 'Start date is required',
    }),
    rent_end_date: z.string({
      required_error: 'End date is required',
    }),
  }).refine(
    (data) => new Date(data.rent_end_date) > new Date(data.rent_start_date),
    {
      message: 'End date must be after start date',
      path: ['rent_end_date'],
    }
  ),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    status: z.enum(['cancelled', 'returned'], {
      required_error: 'Status is required to update booking',
    }),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};