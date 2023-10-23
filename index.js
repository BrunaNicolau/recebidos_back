const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/recebidos", require("./app/controller/comuns.controller"));
app.use("/recebidos/office", require("./app/controller/office.controller"));
app.use("/recebidos/receipt", require("./app/controller/receipt.controller"));
app.use("/recebidos/donor", require("./app/controller/donor.controller"));

app.use(session({  
  secret: 'TODO:',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }
}))
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
