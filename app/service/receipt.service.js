const receiptData = require("../repository/receipt.repository");
const gerarPDF = require("../utils/buildReceiptPDF");

exports.listReceipts = async function (req, res) {
  const instituicaoId = req.params.institutionId;
  const receiptList = await receiptData.getReceipts(instituicaoId);
  if (receiptList.length <= 0)
    throw res.status(204).json({ message: "não encontrado" });

  return receiptList;
};

exports.receiptById = async function (req, res) {
  const receiptId = req.params.receiptId;
  const receiptInfo = await receiptData.getReceiptById(receiptId);
  
  if (!receiptInfo) throw res.status(406).json({ message: "não encontrado" });
  
  const officeHeader = req.headers["office"];
  if (officeHeader != "null" && receiptInfo.officeid != officeHeader)
    throw res.status(406).json({ message: "recibo indisponível" });

  return receiptInfo;
};

exports.newReceipt = async function (req, res) {
  const dataReceipt = req.body;
  const create = await receiptData.createNewReceipt(dataReceipt);
  if (create) {
    var resNewReceipt = {
      txt: "Recibo criado com sucesso:",
      id: create.id,
    };
  } else {
    throw res.status(403).json({ message: "Ação não permitida" });
  }
  return resNewReceipt;
};

exports.editReceipt = async function (req, res) {
  const receiptReq = req.body;
  const dataValidada = await validateFinalDate(receiptReq, res);

  if (dataValidada) {
    const updReceipt = await receiptData.updateDataReceipt(receiptReq);
    if (updReceipt && updReceipt.id) {
      var resUpdate = {
        txt: "Recibo atualizado com sucesso:",
        id: updReceipt.id,
      };
    } else {
      throw res
        .status(403)
        .json({ message: "Não foi possível atualizar os dados do recibo" });
    }
    return resUpdate;
  }
};

exports.editStatusReceipt = async function (req, res) {
  const receipt = req.body;

  const dataValidada = await validateFinalDate(receipt, res);

  if (dataValidada) {
    const updStatusReceipt = await receiptData.updateStatusReceipt(receipt);
    if (updStatusReceipt && updStatusReceipt.id) {
      var resStatusUpdate = {
        txt: "Recibo atualizado com sucesso:",
        id: updStatusReceipt.id,
      };
    } else {
      throw res
        .status(403)
        .json({ message: "Não foi possível realizar a atualização" });
    }

    return resStatusUpdate;
  }
};

async function validateFinalDate(req, res) {
  const receiptReq = req;
  if (receiptReq.status !== "E" && !receiptReq.receiptDate) {
    throw res.status(400).json({ message: "Preencha a Data de término" });
  } else if (receiptReq.status === "E" && receiptReq.receiptDate) {
    throw res
      .status(400)
      .json({ message: "Data fim não é permitido para essa operação" });
  } else if (receiptReq.status !== "E" && receiptReq.receiptDate) {
    const recoverReceipt = await receiptData.getReceiptById(receiptReq.receiptId);
    const inicioDate = new Date(recoverReceipt.receiptDate);
    const fimDate = new Date(receiptReq.receiptDate);

    if (inicioDate >= fimDate) {
      throw res.status(400).json({
        message: "A data de início deve ser anterior à Data de término",
      });
    }
  }
  return true;
}

exports.buildReceiptDoc = async function (req, res) {
  const recovedReceipt = await receiptData.getDocReceipt(req.params.receiptId);
  if (recovedReceipt) var pdf = gerarPDF(recovedReceipt);
  else throw res.status(400).json({ message: "Erro" });
  return pdf;
};
