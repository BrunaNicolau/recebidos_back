const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

//teste
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/recebidos", require("./app/controller/comuns.controller"));
app.use(
  "/recebidos/escritorio",
  require("./app/controller/escritorio.controller")
);
app.use("/recebidos/recibo", require("./app/controller/recibo.controller"));
app.use(
  "/recebidos/contribuinte",
  require("./app/controller/contribuinte.controller")
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
