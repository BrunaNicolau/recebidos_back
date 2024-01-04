const db = require("../config/database");

exports.getReceipts = function (id) {
  return db.query(
    "SELECT recibo.id, recibo.escritorio_id, recibo.valor, recibo.status, escritorio.responsavel " +
      "FROM public.recibo " +
      "JOIN public.escritorio ON recibo.escritorio_id = escritorio.id " +
      "WHERE recibo.instituicao_id = $1 " +
      "ORDER BY recibo.id ASC",
    [id]
  );
};

exports.getReceipt = function (id) {
  return db.oneOrNone("SELECT * FROM public.recibo WHERE id = $1", [id]);
};

exports.createNewReceipt = function (data) {
  return db.oneOrNone(
    "INSERT INTO public.recibo(escritorio_id, instituicao_id, valor, method_payment) VALUES ($1, $2, $3, $4) RETURNING id",
    [data.office, data.institution, data.value, data.paymentMethod]
  );
};

exports.editReceipt = function (data) {
  return db.oneOrNone(
    "UPDATE public.recibo SET escritorio_id = $1, valor = $2, method_payment = $3, status = $4, fim = $5 WHERE id = $6 RETURNING id",
    [
      data.office,
      data.value,
      data.typePayment,
      data.status,
      data.receiptDate,
      data.receiptID,
    ]
  );
};

exports.editStatusReceipt = function (data) {
  return db.oneOrNone(
    "UPDATE public.recibo SET status = $1, fim = $2 WHERE id = $3 RETURNING id",
    [data.status, data.receiptDate, data.receiptID]
  );
};

exports.getDocReceipt = function (id) {
  return db.oneOrNone("SELECT * FROM public.recibo WHERE id = $1", [id, "R"]);
};
