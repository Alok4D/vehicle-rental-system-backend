import prisma from '../../utlis/prisma';

const createVehicle = async (payload: any) => {
  const result = await prisma.vehicle.create({
    data: payload,
    select: {
      id: true,
      vehicle_name: true,
      type: true,
      registration_number: true,
      daily_rent_price: true,
      availability_status: true,
    }
  });
  return result;
};

const getAllVehicles = async () => {
  const result = await prisma.vehicle.findMany({
    select: {
      id: true,
      vehicle_name: true,
      type: true,
      registration_number: true,
      daily_rent_price: true,
      availability_status: true,
    }
  });
  return result;
};

const getVehicleById = async (vehicleId: number) => {
  const result = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
    select: {
      id: true,
      vehicle_name: true,
      type: true,
      registration_number: true,
      daily_rent_price: true,
      availability_status: true,
    }
  });
  if (!result) {
    throw new Error('Vehicle not found');
  }
  return result;
};

const updateVehicle = async (vehicleId: number, payload: any) => {
  const result = await prisma.vehicle.update({
    where: { id: vehicleId },
    data: payload,
    select: {
      id: true,
      vehicle_name: true,
      type: true,
      registration_number: true,
      daily_rent_price: true,
      availability_status: true,
    }
  });
  return result;
};

const deleteVehicle = async (vehicleId: number) => {
  // Check if vehicle has active bookings
  const activeBookings = await prisma.booking.findMany({
    where: {
      vehicle_id: vehicleId,
      status: 'active',
    },
  });

  if (activeBookings.length > 0) {
    throw new Error('Cannot delete vehicle with active bookings');
  }

  await prisma.vehicle.delete({
    where: { id: vehicleId },
  });
  
  return null;
};

export const VehicleServices = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
