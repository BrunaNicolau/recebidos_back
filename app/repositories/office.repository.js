const OfficeTableModel = require("../models/officeTable");

exports.getOfficesByInstitutionId = async function (institutionId) {
  const officesList = await OfficeTableModel.findAll({
    attributes: ["id", "responsable", "status"],
    where: { institutionid: institutionId },
    order: [["id", "ASC"]],
  });
  return officesList;
};

exports.getOfficeByOfficeId = async function (officeId) {
  const officeByID = await OfficeTableModel.findOne({
    attributes: [
      "id",
      "institutionid",
      "responsable",
      "address",
      "zipcode",
      "telephone",
      "document",
      "startdate",
      "enddate",
      "status",
      "email",
    ],
    where: { id: officeId },
  });

  return officeByID;
};

exports.createNewOffice = async function (officeData) {
  const newOffice = await OfficeTableModel.create({
    institutionid: officeData.institutionId,
    responsable: officeData.responsable,
    address: officeData.address,
    document: officeData.document,
    zipcode: officeData.zipCode,
    telephone: officeData.telephone,
    email: officeData.email,
  });
  return newOffice.dataValues.id;
};

exports.updateDataOffice = async function (updateOfficeData) {
  const [numberOfUpdatedRows, [updatedOffice]] = await OfficeTableModel.update(
    {
      responsable: updateOfficeData.responsable,
      document: updateOfficeData.document,
      address: updateOfficeData.address,
      zipcode: updateOfficeData.zipCode,
      telephone: updateOfficeData.telephone,
      enddate: updateOfficeData.endDate,
      status: updateOfficeData.status,
      email: updateOfficeData.email,
    },
    {
      where: {
        id: updateOfficeData.officeId,
      },
      returning: true,
    }
  );
  
  return numberOfUpdatedRows > 0 ? updatedOffice.id : null;
};
