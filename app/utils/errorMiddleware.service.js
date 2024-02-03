const { ApiError } = require("./errorHandle");

function errorHandlingMiddleware(err, res) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    //TODO: Por algo semelhante GrayLog
    console.log(err);
    res.status(500).json({ message: "Erro do Servidor Interno" });
  }
}

module.exports = errorHandlingMiddleware;
