const db = require("../config/database");

exports.getOfficesByinstituicaoid = function (id) {
  return db.query(
    "SELECT id, responsavel, status FROM public.escritorio WHERE instituicaoid = $1 ORDER BY id ASC",
    [id]
  );
};

exports.getReceiptByescritorioid = function (id) {
  return db.query(
    "SELECT escritorio_id, SUM(valor) FROM public.recibo WHERE escritorio_id = $1 GROUP BY escritorio_id;",[id]
  );
};

exports.insertNewOffice = function (dataOffice) {
  // TODO: nome e endereço são opicionais
  return db.query(
    "INSERT INTO recebidos.escritorio(instituicaoid, nome, responsavel, endereco, documento, inicio) VALUES ($1)",
    [dataOffice]
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
