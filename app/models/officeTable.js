const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const OfficeTableModel = sequelize.define(
  "offices",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    institutionid: {
      type: DataTypes.INTEGER,
    },
    responsable: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    zipcode: {
      type: DataTypes.STRING,
    },
    telephone: {
      type: DataTypes.STRING,
    },
    document: {
      type: DataTypes.STRING,
    },
    startdate: {
      type: DataTypes.DATE,
    },
    enddate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = OfficeTableModel;