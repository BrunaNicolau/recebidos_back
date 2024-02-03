const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const OfficeTableModel = require("./officeTable");

const ReceiptTableModel = sequelize.define(
  "receipts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startdate: {
      type: DataTypes.DATE,
    },
    enddate: {
      type: DataTypes.DATE,
    },
    payername: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    officeid: {
      type: DataTypes.INTEGER,
    },
    institutionid: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.FLOAT,
    },
    methodpayment: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

ReceiptTableModel.belongsTo(OfficeTableModel, { foreignKey: "officeid" });
module.exports = ReceiptTableModel;
