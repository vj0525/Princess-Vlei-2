module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  //Uncomment this when secure registration is implemented
  //router.post('/register',user.register);
  
  router.post('/login',user.login);

  app.use('/api/user', router);
};