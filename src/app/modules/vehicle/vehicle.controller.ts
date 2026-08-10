import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { VehicleServices } from './vehicle.service';

const createVehicle = catchAsync(async (req, res) => {
  const result = await VehicleServices.createVehicle(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Vehicle created successfully',
    data: result,
  });
});

const getAllVehicles = catchAsync(async (req, res) => {
  const result = await VehicleServices.getAllVehicles();

  if (!result || result.length === 0) {
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'No vehicles found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicles retrieved successfully',
    data: result,
  });
});

const getVehicleById = catchAsync(async (req, res) => {
  const vehicleId = Number(req.params.vehicleId);
  const result = await VehicleServices.getVehicleById(vehicleId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicle retrieved successfully',
    data: result,
  });
});

const updateVehicle = catchAsync(async (req, res) => {
  const vehicleId = Number(req.params.vehicleId);
  const result = await VehicleServices.updateVehicle(vehicleId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicle updated successfully',
    data: result,
  });
});

const deleteVehicle = catchAsync(async (req, res) => {
  const vehicleId = Number(req.params.vehicleId);
  await VehicleServices.deleteVehicle(vehicleId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicle deleted successfully',
    data: null as any,
  });
});

export const VehicleControllers = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
