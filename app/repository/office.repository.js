const db = require("../config/database");

exports.getOfficesByinstituicaoid = function (id) {
  return db.query(
    "SELECT id, responsavel, status FROM public.escritorio WHERE instituicaoid = $1 ORDER BY id ASC",
    [id]
  );
};

exports.getOfficesByOfficeId = function (id) {
  return db.query(
    "SELECT id, instituicaoid, nome, responsavel, endereco, documento, inicio, fim, status FROM public.escritorio WHERE id = $1",
    [id]
  );
};

exports.newOffice = function (data) {
  //TODO: criar coluna cep e telefone e apagar coluna nome 
  return db.query(
    "INSERT INTO public.escritorio(instituicaoid, responsavel, endereco, documento, inicio) VALUES ($1, $2, $3, $4, $5)",
    [data.institutionId, data.responsible, data.adress, data.document, data.date]
  );
};

exports.updateDataOffice = function (dataOffice, id) {
  // TODO: ajustar essa query
  return db.query(
    "UPDATE recebidos.escritorio responsavel = $1, endereco = $2, documento = $3, fim = $4, status = $5 SET WHERE id = $6",
    [
      dataOffice.nome,
      dataOffice.endereco,
      dataOffice.documento,
      dataOffice.fim,
      dataOffice.status,
      id,
    ]
  );
};

exports.getReceiptByescritorioid = function (id) {
  return db.query(
    "SELECT escritorio_id, SUM(valor) FROM public.recibo WHERE escritorio_id = $1 GROUP BY escritorio_id;",
    [id]
  );
};
