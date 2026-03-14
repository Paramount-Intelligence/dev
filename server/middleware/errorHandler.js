const ApiError = require("../utils/ApiError");

const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

const errorHandler = (error, _req, res, _next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(error.errors).map((entry) => ({
        field: entry.path,
        message: entry.message
      }))
    });
  }

  if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || { email: 1 })[0];

    return res.status(409).json({
      message: "Duplicate value error",
      errors: [
        {
          field: duplicateField,
          message: `${duplicateField} must be unique`
        }
      ]
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid request data",
      errors: [
        {
          field: error.path,
          message: "Provided value could not be processed"
        }
      ]
    });
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    message: error.message || "Internal server error",
    errors: error.errors || []
  });
};

module.exports = {
  notFound,
  errorHandler
};
