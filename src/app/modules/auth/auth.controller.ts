import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { AuthServices } from './auth.service';

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signup(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const signin = catchAsync(async (req, res) => {
  const result = await AuthServices.signin(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const AuthControllers = {
  signup,
  signin,
};
