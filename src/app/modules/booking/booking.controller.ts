import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBooking(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.getAllBookings(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: user.role === 'admin' ? 'Bookings retrieved successfully' : 'Your bookings retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const bookingId = Number(req.params.bookingId);
  const user = req.user;
  const status = req.body.status;

  const result = await BookingServices.updateBooking(bookingId, user, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: status === 'returned' ? 'Booking marked as returned. Vehicle is now available' : 'Booking cancelled successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
};
