const receiptData = require("../repository/receipt.repository");

exports.getReceipts = function (req) {
  const receiptList = receiptData.getReceipts(req);
  // TODO: montar resposta com todos os campo
  // TODO: ajustar para atender os 2 fluxos
  return receiptList;
};

exports.getReceiptById = function () {
  //montar query
};

exports.editReceipts = function () {
  // validação de ususario
  //montar query
};

exports.createReceipts = function () {
  // validação de ususario
  //montar query
};

exports.editStatusReceipts = function () {
  // validação de ususario
  //montar query
};
