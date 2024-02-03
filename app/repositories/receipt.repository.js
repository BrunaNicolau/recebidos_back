const OfficeTableModel = require("../models/officeTable");
const ReceiptTableModel = require("../models/receiptTable");

exports.getReceipts = async function (institutionId) {
  const receiptList = ReceiptTableModel.findAll({
    attributes: ["id", "officeid", "value", "status"],
    include: [
      {
        model: OfficeTableModel,
        attributes: ["responsable"],
      },
    ],
    where: {
      institutionid: institutionId,
    },
    order: [["id", "ASC"]],
    raw: true,
  });
  
  const flattenedReceiptList = (await receiptList).map((receipt) => ({
    id: receipt.id,
    officeid: receipt.officeid,
    value: receipt.value,
    status: receipt.status,
    responsable: receipt["office.responsable"],
  }));

  return flattenedReceiptList;
};

exports.getReceiptById = function (receiptId) {
  return ReceiptTableModel.findOne({
    where: {
      id: receiptId,
    },
  });
};

exports.createNewReceipt = function (receiptData) {
  return ReceiptTableModel.create({
    officeid: receiptData.officeId,
    institutionid: receiptData.institutionId,
    value: receiptData.value,
    methodpayment: receiptData.methodPayment,
  });
};

exports.updateReceipt = async function (updateReceiptData) {
  const [numberOfUpdatedRows, [updatedReceipt]] =
    await ReceiptTableModel.update(
      {
        officeid: updateReceiptData.officeId,
        value: updateReceiptData.value,
        methodpayment: updateReceiptData.methodPayment,
        status: updateReceiptData.status,
        enddate: updateReceiptData.receiptDate,
      },
      {
        where: { id: updateReceiptData.receiptId },
        returning: ["id"],
      }
    );

  return numberOfUpdatedRows > 0 ? updatedReceipt.id : null;
};

exports.updateStatusReceipt = async function (updStatusReceiptData) {
  const [numberOfUpdatedRows, [updatedStatusReceipt]] =
    await ReceiptTableModel.update(
      {
        status: updStatusReceiptData.status,
        enddate: updStatusReceiptData.receiptDate,
      },
      {
        where: { id: updStatusReceiptData.receiptId },
        returning: ["id"],
      }
    );

  return numberOfUpdatedRows > 0 ? updatedStatusReceipt.id : null;
};

exports.getDocReceipt = function (receiptId) {
  return ReceiptTableModel.findOne({
    where: {
      id: receiptId,
      status: "E",
    },
  });
};
