const receiptData = require("../repositories/receipt.repository");
const gerarPDF = require("../utils/buildReceiptPDF");
const {
  EmptyError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/errorHandle");

exports.listReceipts = async function (instituicaoId) {
  const receiptList = await receiptData.getReceipts(instituicaoId);
  if (receiptList.length <= 0) throw new EmptyError("");
  return receiptList;
};

exports.receiptById = async function (receiptId, officeInfo) {
  const receiptInfo = await receiptData.getReceiptById(receiptId);

  if (!receiptInfo) throw new EmptyError("");

  const officeHeader = officeInfo;
  if (officeHeader != "null" && receiptInfo.officeid != officeHeader)
    throw new UnauthorizedError("recibo indisponível");

  return receiptInfo;
};

exports.newReceipt = async function (dataReceipt) {
  try {
    const create = await receiptData.createNewReceipt(dataReceipt);
    if (create) {
      var resNewReceipt = {
        txt: "Recibo criado com sucesso:",
        id: create.id,
      };
    } else {
      throw new UnauthorizedError("Ação não permitida");
    }
    return resNewReceipt;
  } catch {
    throw new BadRequestError("Dados inválidos");
  }
};

exports.editReceipt = async function (rptData) {
  try {
    const dataValidada = await validateFinalDate(rptData);
    if (dataValidada) {
      const updReceipt = await receiptData.updateReceipt(rptData);
      if (updReceipt) {
        var resUpdate = {
          txt: "Recibo atualizado com sucesso:",
          id: updReceipt,
        };
      } else {
        throw new UnauthorizedError("Ação não permitida");
      }
      return resUpdate;
    }
  } catch {
    throw new BadRequestError("Dados inválidos");
  }
};

exports.editStatusReceipt = async function (receiptStatusData) {
  try {
    const dataValidada = await validateFinalDate(receiptStatusData);

    if (dataValidada) {
      const updStatusReceipt = await receiptData.updateStatusReceipt(
        receiptStatusData
      );
      if (updStatusReceipt) {
        var resStatusUpdate = {
          txt: "Recibo atualizado com sucesso:",
          id: updStatusReceipt,
        };
      } else {
        throw new UnauthorizedError("Ação não permitida");
      }

      return resStatusUpdate;
    }
  } catch {
    throw new BadRequestError("Dados inválidos");
  }
};

async function validateFinalDate(receiptInfo) {
  const receiptReq = receiptInfo;
  if (receiptReq.status !== "E" && !receiptReq.receiptDate) {
    throw new UnauthorizedError("Preencha a Data de término");
  } else if (receiptReq.status === "E" && receiptReq.receiptDate) {
    throw new UnauthorizedError("Data fim não é permitido para essa operação");
  } else if (receiptReq.status !== "E" && receiptReq.receiptDate) {
    const recoverReceipt = await receiptData.getReceiptById(
      receiptReq.receiptId
    );
    const inicioDate = new Date(recoverReceipt.receiptDate);
    const fimDate = new Date(receiptReq.receiptDate);

    if (inicioDate >= fimDate) {
      throw new UnauthorizedError(
        "A data de início deve ser anterior à Data de término"
      );
    }
  }
  return true;
}

exports.buildReceiptDoc = async function (receiptId) {
  try {
    const recovedReceipt = await receiptData.getDocReceipt(receiptId);
    if (recovedReceipt) var pdf = gerarPDF(recovedReceipt);
    else throw new UnauthorizedError("Ação não permitida");
    return pdf;
  } catch {
    throw new BadRequestError("Dado inválido");
  }
};
