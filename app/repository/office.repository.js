const db = require("../config/database");

exports.getOfficesByinstituicaoid = function (institutionId) {
  return db.query(
    "SELECT id, responsable, status FROM public.offices WHERE institutionid = $1 ORDER BY id ASC",
    [institutionId]
  );
};

exports.getOfficeByOfficeId = function (officeId) {
  return db.oneOrNone(
    "SELECT id, institutionId, responsable, address, zipcode, telephone, document, startdate, enddate, status, email FROM public.offices WHERE id = $1",
    [officeId]
  );
};

exports.createNewOffice = function (officeData) {
  return db.query(
    "INSERT INTO public.offices(institutionId, responsable, address, document, zipcode, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    [
      officeData.institutionId,
      officeData.responsible,
      officeData.address,
      officeData.document,
      officeData.zipCode,
      officeData.telephone,
      officeData.email,
    ]
  );
};

exports.updateDataOffice = function (updateOfficeData) {
  return db.query(
    "UPDATE public.offices SET responsable= $1, document= $2, address= $3, zipcode= $4, telephone=$5, enddate= $6, status= $7, email=$8 WHERE id = $9 RETURNING id",
    [
      updateOfficeData.responsable,
      updateOfficeData.document,
      updateOfficeData.address,
      updateOfficeData.zipCode,
      updateOfficeData.telephone,
      updateOfficeData.endDate,
      updateOfficeData.status,
      updateOfficeData.email,
      updateOfficeData.officeId,
    ]
  );
};
