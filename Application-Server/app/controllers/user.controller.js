const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register method
exports.register = (req,res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organism."
      });
    else res.status(200).json("User created");;
  });
}

//login method
exports.login = (req,res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  User.findByUsername(user.username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the username."
      });
    
    bcrypt.compare(user.password, data.Password, function(err, result) {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while comparing passwords."
      });

      if(result == true){
        const token = jwt.sign({username:user.username},"princess_vlei");
        res.status(200).json({user:{token}});
      }else{
        res.status(500).send({
          message: "Incorrect Password."
        });
      }
    });
  });
  
}