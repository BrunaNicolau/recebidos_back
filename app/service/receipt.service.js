const receiptData = require("../repository/receipt.repository");
const gerarPDF = require("../utils/buildReceiptPDF");

exports.getReceipts = async function (req, res) {
  const instituicaoId = req.params.institutionId;
  const receiptList = await receiptData.getReceipts(instituicaoId);
  if (receiptList.length <= 0)
    throw res.status(204).json({ message: "não encontrado" });

  return receiptList;
};

exports.getReceiptById = async function (req, res) {
  const officeHeader = req.headers["office"];

  const receiptId = req.params.receiptId;
  const receiptInfo = await receiptData.getReceipt(receiptId);

  if (!receiptInfo) throw res.status(406).json({ message: "não encontrado" });

  if (officeHeader != "null" && receiptInfo.escritorio_id != officeHeader)
    throw res.status(406).json({ message: "recibo indisponível" });

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
    throw res.status(403).json({ message: "Ação não permitida" });
  }
  return resNewReceipt;
};

exports.editReceipts = async function (req, res) {
  const receiptReq = req.body;
  const dataValidada = await validaDataFinal(receiptReq, res);

  if (dataValidada) {
    const updReceipt = await receiptData.editReceipt(receiptReq);
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

exports.editStatusReceipts = async function (req, res) {
  const receipt = req.body;

  const dataValidada = await validaDataFinal(receipt, res);

  if (dataValidada) {
    const updStatusReceipt = await receiptData.editStatusReceipt(receipt);
    if (updStatusReceipt && updStatusReceipt.id) {
      var resStatusUpdate = {
        txt: "Recibo atualizado com sucesso:",
        id: updStatusReceipt.id,
      };
    } else {
      throw res
        .status(403)
        .json({ message: "Nao foi possivel realizar a atualizacao" });
    }

    return resStatusUpdate;
  }
};

async function validaDataFinal(req, res) {
  const receiptReq = req;

  if (receiptReq.status !== "E" && !receiptReq.receiptDate) {
    throw res.status(400).json({ message: "Preencha a Data de término" });
  } else if (receiptReq.status === "E" && receiptReq.receiptDate) {
    throw res
      .status(400)
      .json({ message: "Data fim não é permitido para essa operação" });
  } else if (receiptReq.status !== "E" && receiptReq.receiptDate) {
    const recoverReceipt = await receiptData.getReceipt(receiptReq.receiptID);
    const inicioDate = new Date(recoverReceipt.inicio);
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
