const db = require("../config/database");

exports.checkUser = function (username, password) {
  return db.query(
    "SELECT * FROM  public.users WHERE username = $1 AND password = $2 ",
    [username, password]
  );
};
