class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class EmptyError extends ApiError {
  constructor(message) {
    super(message, 204);
  }
}

class BadRequestError extends ApiError {
  constructor(message) {
    super(message, 400);
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(message, 404);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  EmptyError 
};
