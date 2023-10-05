const receiptData = require("../repository/receipt.repository");

exports.getReceipts = async function (req, res) {
  // TODO: montar resposta com todos os campo
  const instituicaoId = req.params.id;
  const receiptList = await receiptData.getReceipts(instituicaoId);
  if (receiptList.length <= 0)
    throw res.status(204).json({ error: "não encontrado" });
  return receiptList;
};

exports.getReceiptById = async function (req, res) {
  // TODO: montar resposta com todos os campo
  const receiptId = req.params.id;
  const receiptInfo = await receiptData.getReceipt(receiptId);
  if (!receiptInfo) throw res.status(204).json({ error: "não encontrado" });
  return receiptInfo;
};

exports.createReceipts = async function (req, res) {
  //TODO: validação de ususario
  const dataReceipt = req.body;
  const create = await receiptData.createNewReceipt(dataReceipt);
  if (create) {
    var resNewReceipt = {
      txt: "Recibo criado com sucesso:",
      id: create.id,
    };
  } else {
    throw res.status(403).json({ error: "Ação não permitida" });
  }
  return resNewReceipt;
};

exports.editReceipts = async function (req, res) {
  //TODO: falta algumas regras 
  // quando mudar de status precisa verificar se precisa de data de recebimento
  // data fim tem q ser maior q data inicio (por essa regra em utils)
  //TODO: pensar em redundancia 
  const receipt = req.body;
  const updReceipt = await receiptData.editReceipt(receipt);
  if (updReceipt.id) {
    var resUpdate = {
      txt: "Recibo atualizado com sucesso:",
      id: updReceipt.id,
    };
  } else {
    throw res.status(403).json({ error: "Erro" });
  }
  return resUpdate;
};

exports.editStatusReceipts = async function (req, res) {
  //TODO: falta algumas regras 
  // data fim tem q ser maior q data inicio (por essa regra em utils)
  const receipt = req.body;
  const updStatusReceipt = await receiptData.editStatusReceipt(receipt);
  if (updStatusReceipt.id) {
    var resUpdate = {
      txt: "Recibo atualizado com sucesso:",
      id: updStatusReceipt.id,
    };
  } else {
    throw res.status(403).json({ error: "Erro" });
  }
  return resUpdate;
};
