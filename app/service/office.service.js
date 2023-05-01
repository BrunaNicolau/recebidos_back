const escritorioData = require("../repository/office.repository");

exports.getlistOffices = async function (req) {
  const instituicaoid = req.params.id;
  const officesList = await escritorioData.getOfficesByinstituicaoid(
    instituicaoid
  );
  // TODO: montar resposta com todos os campo e tratar erros 
  return officesList;
};

exports.getOffice = async function (req) {
  const officeID = req.params.id;
  let officeData = await escritorioData.getOfficesByOfficeId(officeID);
  return officeData;
};

exports.createOffice = async function (req) {
  const dataOffice = req.body;
  const create = await escritorioData.newOffice(dataOffice);
  if (create) {
    var resNew = {
      txt: "Escritorio criado com sucesso:",
      id: create[0].id,
    };
  }
  return resNew;
};

exports.editOffice = async function (req) {
  const office = req.body;
  const updOffice = await escritorioData.updateDataOffice(office);
  if (updOffice) {
    var resUpdate = {
      txt: "Escritorio atulizado com sucesso:",
      id: updOffice[0].id,
    };
  }
  return resUpdate;
};
