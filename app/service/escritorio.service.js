const escritorioData = require("../repository/escritorio.repository");

// TODO: por validação de usario e ajustar o res
exports.getOffices = function () {
  // TODO: apagar essa linha
  const instituicaoid = 3;
  const escritorioid = 3;


  const officesData = escritorioData.getOfficesByinstituicaoid(instituicaoid);
  const receiptData = escritorioData.getReceiptByescritorioid(escritorioid);

  //fazer soma de valor e quantidade de recbidos iterar em um obj com as infos do officesData

  return receiptData;
};

exports.createOffice = function (req) {
  //montar validação da req
  // console.log(req)
  let dataOffice = req; 
  
  //TODO: ajustar essa query 
  const t = escritorioData.getOfficesByinstituicaoid(req);
  // console.log('passou aq')
  return dataOffice;
};

exports.editOffice = function (req) {

  const t = escritorioData.getOfficesByinstituicaoid(req);
  //montar validação da req
  //montar query

};
