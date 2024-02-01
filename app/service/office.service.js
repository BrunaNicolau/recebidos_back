const escritorioData = require("../repository/office.repository");
const { EmptyError, BadRequestError, UnauthorizedError } = require("../utils/errorHandle");

exports.listOffices = async function (institutionId) {
  const officesList = await escritorioData.getOfficesByinstituicaoid(
    institutionId
  );

  if (officesList.length <= 0) throw new EmptyError("");

  return officesList;
};

exports.officeById = async function (officeID) {
  const officeData = await escritorioData.getOfficeByOfficeId(officeID);
  if (!officeData) throw new EmptyError("");
  return officeData;
};

exports.newOffice = async function (dataOffice) {
  //TODO: validar o usuario q esta fazendo acao
  try {
    const create = await escritorioData.createNewOffice(dataOffice);
    if (create) {
      var resNewOffice = {
        txt: "Escritorio criado com sucesso:",
        id: create[0].id,
      };
    } else {
      throw new UnauthorizedError("Ação não permitida");
    }

    return resNewOffice;
  } catch {
    throw new BadRequestError("Dados inválidos");
  }
};

exports.editOffice = async function (dataOffice) {
  //TODO: validar o usuario q esta fazendo acao
  try {
    const editedOffice = await escritorioData.updateDataOffice(dataOffice);
    if (editedOffice[0].id) {
      var resUpdate = {
        txt: "Escritorio atulizado com sucesso:",
        id: editedOffice[0].id,
      };
    } else {
      throw new UnauthorizedError("Ação não permitida");
    }
    return resUpdate;
  } catch {
    throw new BadRequestError("Dados inválidos");
  }
};
