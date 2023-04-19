const escritorioData = require("../repository/office.repository");

// TODO: na tabela de escritorioData, preciso criar os campos cep e telefone

exports.getlistOffices = async function (req) {
  const instituicaoid = req.params.id;
  let officesList = await escritorioData.getOfficesByinstituicaoid(
    instituicaoid
  );

  return officesList;
};

exports.getOffice = async function (req) {
  const officeID = req.params.id;
  let officeData = await escritorioData.getOfficesByOfficeId(officeID);
  console.log(officeData);
  // create query

  return officeData;
};


exports.createOffice = async function (req) {
  //TODO: validação da req
  const dataOffice = req.body;
  // console.log(dataOffice);

  const create = await escritorioData.newOffice(dataOffice);
  console.log(create)
  return create;
};

exports.editOffice = function (req) {
  const t = escritorioData.getOfficesByinstituicaoid(req);
  //montar validação da req
  //montar query
};
