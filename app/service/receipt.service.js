const receiptData = require("../repository/receipt.repository");

exports.getReceipts = async function (req, res) {
  // TODO: montar resposta com todos os campo
  const instituicaoId = req.params.id;
  const receiptList = await receiptData.getReceipts(instituicaoId);
  if (receiptList.length <= 0)
    throw res.status(204).json({ error: "nao encontrado" });
  return receiptList;
};

exports.getReceiptById = async function (req, res) {
  const receiptId = req.params.id;
  const receiptInfo = await receiptData.getReceipt(receiptId);
  if (!receiptInfo) throw res.status(204).json({ error: "nao encontrado" });
  return receiptInfo;
};

exports.createReceipts = function () {
  // validação de ususario
  //montar query
};

exports.editReceipts = function () {
  // validação de ususario
  //montar query
  return "bateu na funcao edit !";
};

exports.editStatusReceipts = function () {
  // validação de ususario
  //montar query
};
