import { ErrorRequestHandler } from 'express';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong!';

  if (err.code === 'P2002') {
    statusCode = 400;
    message = 'Duplicate entry found!';
  }

  if (err.name === 'Error') {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
