module.exports = app => {
  const education = require("../controllers/education.controller.js");
  const {verifyToken} = require("../Auth/auth");

  var router = require("express").Router();

  // Create a new Organisms
  router.post("/", verifyToken, education.create);

  //Modify an existing Fauna Survey
  router.put("/:id", verifyToken, education.update);

  // Retrieve all Organisms
  router.get("/", education.findAll);

  // Retrieve a single Organism with id
  router.get("/:id", education.findOne);

  // Delete a Organism with id
  router.delete("/:id", verifyToken, education.delete);

  app.use('/api/education', router);
};