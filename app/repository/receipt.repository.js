const db = require("../config/database");

exports.getReceipts = function (receiptId) {
  return db.query(
    "SELECT r.id, r.officeid, r.value, r.status, o.responsable " +
      "FROM public.receipts r " +
      "JOIN public.offices o ON r.officeid = o.id " +
      "WHERE r.institutionid = $1 ORDER BY r.id ASC;",
    [receiptId]
  );
};

exports.getReceiptById = function (receiptId) {
  return db.oneOrNone("SELECT * FROM public.receipts WHERE id = $1", [
    receiptId,
  ]);
};

exports.createNewReceipt = function (receiptData) {
  return db.oneOrNone(
    "INSERT INTO public.receipts(officeid, institutionid, value, methodpayment) VALUES ($1, $2, $3, $4) RETURNING id",
    [
      receiptData.officeId,
      receiptData.institutionId,
      receiptData.value,
      receiptData.methodPayment,
    ]
  );
};

exports.updateReceipt = function (updateReceiptData) {
  return db.oneOrNone(
    "UPDATE public.receipts SET officeid = $1, value = $2, methodpayment = $3, status = $4, enddate = $5 WHERE id = $6 RETURNING id",
    [
      updateReceiptData.officeId,
      updateReceiptData.value,
      updateReceiptData.methodPayment,
      updateReceiptData.status,
      updateReceiptData.receiptDate,
      updateReceiptData.receiptId,
    ]
  );
};

exports.updateStatusReceipt = function (updStatusReceiptData) {
  return db.oneOrNone(
    "UPDATE public.receipts SET status = $1, enddate= $2 WHERE id = $3 RETURNING id",
    [
      updStatusReceiptData.status,
      updStatusReceiptData.receiptDate,
      updStatusReceiptData.receiptId,
    ]
  );
};

exports.getDocReceipt = function (receiptId) {
  return db.oneOrNone("SELECT * FROM public.receipts WHERE id = $1", [
    receiptId,
    "R",
  ]);
};
