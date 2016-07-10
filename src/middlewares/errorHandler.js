import logger from '../libs/logger';
import {
  CustomError,
  InternalServerError,
} from '../libs/errors';

module.exports = function errorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars
  // In case of a CustomError class, use it's data
  // Otherwise try to identify the type of error
  // If we can't identify it, respond with a generic 500 error

  let responseErr = err instanceof CustomError ? err : null;

  // Handle errors created with 'http-errors' or similar that have a status/statusCode property
  if (err.statusCode && typeof err.statusCode === 'number') {
    responseErr = new CustomError();
    responseErr.httpCode = err.statusCode;
    responseErr.name = err.name;
    responseErr.message = err.message;
  }

  if (!responseErr || responseErr.httpCode >= 500) {
    // Try to identify the error...
    // ...
    // Otherwise create an InternalServerError and use it
    // we don't want to leak anything, just a generic error message
    // Use it also in case of identified errors but with httpCode === 500
    responseErr = new InternalServerError();
  }

  // log the error
  logger.error(err, {
    method: req.method,
    originalUrl: req.originalUrl,
    headers: req.headers,
    body: req.body,
    httpCode: responseErr.httpCode,
    isHandledError: responseErr.httpCode < 500,
  });

  // In some occasions like when invalid JSON is supplied `res.respond` might be not yet avalaible,
  // in this case we use the standard res.status(...).json(...)
  return res.status(responseErr.httpCode).json({
    error: responseErr.name,
    message: responseErr.message,
    data: responseErr.data,
  });
};
