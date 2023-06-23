const db = require("../config/database");

exports.getOfficesByinstituicaoid = function (id) {
  return db.query(
    "SELECT id, responsavel, status FROM public.escritorio WHERE instituicaoid = $1 ORDER BY id ASC",
    [id]
  );
};

exports.getOfficesByOfficeId = function (id) {
  return db.oneOrNone(
    "SELECT id, instituicaoid, responsavel, endereco, cep, telefone, documento, inicio, fim, status FROM public.escritorio WHERE id = $1",
    [id]
  );
};

exports.newOffice = function (data) {
  //TODO: falta gravar a data de inicio
  return db.query(
    "INSERT INTO public.escritorio(instituicaoid, responsavel, endereco, documento, cep, telefone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [
      data.institutionId,
      data.responsible,
      data.address,
      data.document,
      data.zipCode,
      data.telephone
    ]
  );
};

exports.updateDataOffice = function (dataOffice) {
  return db.query(
    "UPDATE public.escritorio SET responsavel= $1, documento= $2, endereco= $3, cep= $4, telefone=$5, fim= $6, status= $7 WHERE id = $8 RETURNING id",
    [
      dataOffice.responsible,
      dataOffice.document,
      dataOffice.address,
      dataOffice.zipCode,
      dataOffice.telephone,
      dataOffice.endDate,
      dataOffice.status,
      dataOffice.officeId
    ]
  );
};
