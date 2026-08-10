import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = Number(req.params.userId);
  const userRole = req.user.role;
  const loggedInUserId = req.user.id;

  const result = await UserServices.updateUser(userId, userRole, loggedInUserId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = Number(req.params.userId);
  
  await UserServices.deleteUser(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: null,
  });
});

export const UserControllers = {
  getAllUsers,
  updateUser,
  deleteUser,
};
