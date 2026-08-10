import prisma from '../../utlis/prisma';

const createBooking = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicle_id },
  });

  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  if (vehicle.availability_status !== 'available') {
    throw new Error('Vehicle is not available for booking');
  }

  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // If same day booking, count as 1 day
  const daysToCharge = diffDays === 0 ? 1 : diffDays;
  const total_price = vehicle.daily_rent_price * daysToCharge;

  const result = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        customer_id,
        vehicle_id,
        rent_start_date: startDate,
        rent_end_date: endDate,
        total_price,
        status: 'active',
      },
      include: {
        vehicle: {
          select: {
            vehicle_name: true,
            daily_rent_price: true,
          }
        }
      }
    });

    await tx.vehicle.update({
      where: { id: vehicle_id },
      data: {
        availability_status: 'booked',
      },
    });

    return booking;
  });

  return result;
};

const getAllBookings = async (user: any) => {
  const whereCondition = user.role === 'admin' ? {} : { customer_id: user.id };

  const selectVehicleOptions = user.role === 'admin' 
    ? { vehicle_name: true, registration_number: true } 
    : { vehicle_name: true, registration_number: true, type: true };

  const result = await prisma.booking.findMany({
    where: whereCondition,
    include: {
      customer: user.role === 'admin' ? {
        select: {
          name: true,
          email: true,
        }
      } : false,
      vehicle: {
        select: selectVehicleOptions,
      }
    }
  });

  // Prisma include returns customer as null if we say false, so we clean it up if it's a customer request
  if (user.role === 'customer') {
    return result.map((r: any) => {
      const { customer, ...rest } = r;
      return rest;
    });
  }

  return result;
};

const updateBooking = async (bookingId: number, user: any, status: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (user.role === 'customer' && status === 'cancelled') {
    const currentDate = new Date();
    if (currentDate >= booking.rent_start_date) {
      throw new Error('You can only cancel before the start date');
    }
    
    if (booking.customer_id !== user.id) {
        throw new Error('You can only cancel your own booking');
    }
  }

  if (user.role === 'customer' && status === 'returned') {
     throw new Error('Only Admin can mark a booking as returned');
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: { status: status as any },
      include: {
        vehicle: {
            select: { availability_status: true }
        }
      }
    });

    if (status === 'returned' || status === 'cancelled') {
      await tx.vehicle.update({
        where: { id: booking.vehicle_id },
        data: {
          availability_status: 'available',
        },
      });
      updatedBooking.vehicle.availability_status = 'available' as any;
    }

    return updatedBooking;
  });

  return result;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  updateBooking,
};