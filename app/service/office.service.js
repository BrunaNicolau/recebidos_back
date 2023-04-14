const escritorioData = require("../repository/office.repository");

// TODO: por validação de usario e ajustar o res
exports.getOffices = async function (req) {
  const instituicaoid = req.params.id;
  const officesData = await escritorioData.getOfficesByinstituicaoid(
    instituicaoid
  );
  
  
  let storeReceiptPerOffice = [];
  officesData.forEach( async office => {
    const receiptData = await escritorioData.getReceiptByescritorioid(office.id);
    storeReceiptPerOffice.push(receiptData);
    console.log(storeReceiptPerOffice);
  });

  const res = await storeReceiptPerOffice;
  console.log(res)

  return res;
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
