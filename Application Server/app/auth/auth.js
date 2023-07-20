const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req,res,next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, "princess_vlei", (err, user) => {
      if (err) {
        console.log("error: ", err);
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
module.exports = {verifyToken};