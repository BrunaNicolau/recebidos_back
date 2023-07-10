const escritorioData = require("../repository/office.repository");

exports.getlistOffices = async function (req, res) {
  // TODO: montar resposta com todos os campo
  const instituicaoid = req.params.id;
  const officesList = await escritorioData.getOfficesByinstituicaoid(
    instituicaoid
  );
  if (officesList.length <= 0)
    throw res.status(204).json({ error: "nao encontrado" });
  return officesList;
};

exports.getOffice = async function (req, res) {
  const officeID = req.params.id;
  const officeData = await escritorioData.getOfficesByOfficeId(officeID);
  if (!officeData) throw res.status(204).json({ error: "nao encontrado" });
  return officeData;
};

exports.createOffice = async function (req, res) {
  const dataOffice = await req.body;
  const create = await escritorioData.newOffice(dataOffice);
  if (create) {
    var resNew = {
      txt: "Escritorio criado com sucesso:",
      id: create[0].id,
    };
  } else {
    throw res.status(403).json({ error: "Acao Proibida" });
  }
  return resNew;
};

exports.editOffice = async function (req, res) {
  const office = req.body;
  const updOffice = await escritorioData.updateDataOffice(office);
  if (updOffice[0].id) {
    var resUpdate = {
      txt: "Escritorio atulizado com sucesso:",
      id: updOffice[0].id,
    };
  } else {
    throw res.status(403).json({ error: "Erro" });
  }
  return resUpdate;
};
