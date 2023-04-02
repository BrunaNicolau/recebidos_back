const express = require('express');
const app = express();
const port = 3000;

app.use('/', require('./app/controller/comuns.controller'));
app.use('/escritorio', require('./app/controller/escritorio.controller'));
app.use('/recibo', require('./app/controller/recibo.controller'));
app.use('/contribuinte', require('./app/controller/contribuinte.controller'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
