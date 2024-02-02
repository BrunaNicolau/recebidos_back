const { ApiError } = require("../utils/errorHandle");

function errorHandlingMiddleware(err, res) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = errorHandlingMiddleware;
