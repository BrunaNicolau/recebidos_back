const db = require("../config/database");

exports.getReceipts = function (id) {
  return db.query(
    "SELECT id, escritorio_id, valor, status FROM public.recibo WHERE instituicao_id = $1 ORDER BY id ASC",
    [id]
  );
};

exports.getReceipt = function (id) {
  return db.oneOrNone(
    "SELECT * FROM public.recibo WHERE id = $1 ORDER BY id ASC",
    [id]
  );
};
