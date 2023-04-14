const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

//teste
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/recebidos", require("./app/controller/comuns.controller"));
app.use(
  "/recebidos/office",
  require("./app/controller/office.controller")
);
app.use("/recebidos/receipt", require("./app/controller/receipt.controller"));
app.use(
  "/recebidos/donor",
  require("./app/controller/donor.controller")
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
