const escritorioData = require("../repository/office.repository");

exports.listOffices = async function (req, res) {
  const instituicaoid = req.params.institutionId;
  const officesList = await escritorioData.getOfficesByinstituicaoid(
    instituicaoid
  );
  if (officesList.length <= 0)
    throw res.status(204).json({ error: "não encontrado" });
  return officesList;
};

exports.officeById = async function (req, res) {
  const officeID = req.params.officeId;
  const officeData = await escritorioData.getOfficeByOfficeId(officeID);
  if (!officeData) throw res.status(204).json({ error: "não encontrado" });
  return officeData;
};

exports.newOffice = async function (req, res) {
  const dataOffice = await req.body;
  const create = await escritorioData.createNewOffice(dataOffice);
  if (create) {
    var resNewOffice = {
      txt: "Escritorio criado com sucesso:",
      id: create[0].id,
    };
  } else {
    throw res.status(403).json({ error: "Ação não permitida" });
  }
  return resNewOffice;
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
