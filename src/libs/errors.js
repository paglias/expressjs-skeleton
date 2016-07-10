import extendableBuiltin from './extendableBuiltin';

// Base class for custom application errors
// It extends Error and capture the stack trace
export class CustomError extends extendableBuiltin(Error) {
  constructor () {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class InternalServerError extends CustomError {
  constructor (customMessage, errorData) {
    super();
    this.name = this.constructor.name;
    this.httpCode = 500;
    this.message = customMessage || 'Internal server error.';
    if (errorData) this.data = errorData;
  }
}

export class NotAuthorized extends CustomError {
  constructor (customMessage, errorData) {
    super();
    this.name = this.constructor.name;
    this.httpCode = 401;
    this.message = customMessage || 'Not authorized.';
    if (errorData) this.data = errorData;
  }
}

export class BadRequest extends CustomError {
  constructor (customMessage, errorData) {
    super();
    this.name = this.constructor.name;
    this.httpCode = 400;
    this.message = customMessage || 'Bad request.';
    if (errorData) this.data = errorData;
  }
}

export class NotFound extends CustomError {
  constructor (customMessage, errorData) {
    super();
    this.name = this.constructor.name;
    this.httpCode = 404;
    this.message = customMessage || 'Not found.';
    if (errorData) this.data = errorData;
  }
}
