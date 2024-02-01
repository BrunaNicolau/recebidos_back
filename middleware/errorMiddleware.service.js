const { ApiError } = require("../app/utils/errorHandle");

function errorHandlingMiddleware(err, res) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = errorHandlingMiddleware;
