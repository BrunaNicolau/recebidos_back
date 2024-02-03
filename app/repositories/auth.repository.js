const UserTableModel = require("../models/userTable");

exports.checkUser = async function (username, password) {
  const user = await UserTableModel.findOne({
    where: {
      username: username,
      password: password,
    },
    raw: true,
  });
  return user;
};
