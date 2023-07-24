const sql = require("./db.js");
const bcrypt = require("bcryptjs");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
};

User.create = (newUser, result) => {
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    newUser.password = hash;
    sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created User: ", { uID: res.insertId, ...newUser });
      result(null, { uID: res.insertId, ...newUser });
    });
  });
};

User.matchPassword = (user, password) => {
    bcrypt.compare(user.password, password, function(err, result) {
      if (err) {
        console.log("error: ", err);
        return false;
      }
      
      return true;
    });
};

User.findByUsername = (username, result) => {
  sql.query(`SELECT * FROM User WHERE Username = "${username}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Organism with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;