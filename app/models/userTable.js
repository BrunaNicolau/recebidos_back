const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const UserTableModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    profile: {
      type: DataTypes.INTEGER,
    },
    institution: {
      type: DataTypes.STRING,
    },
    officeid: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = UserTableModel;
