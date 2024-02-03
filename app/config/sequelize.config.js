const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
  username: "postgres",
  password: "pg@2022",
  database: "recebidos",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});
