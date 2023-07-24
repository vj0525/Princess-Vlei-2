module.exports = app => {
  const flora_survey = require("../controllers/flora_survey.controller.js");
  const {verifyToken} = require("../auth/auth");

  var router = require("express").Router();

  // Create a new Flora Survey
  router.post("/", verifyToken, flora_survey.create);

  // Retrieve all invasive Flora Survey
  router.get("/invasive", flora_survey.findAllInvasive);

  // Retrieve all invasive Flora Survey
  router.get("/", flora_survey.findAll);

  // Retrieve a single Flora Survey with id
  router.get("/:id", flora_survey.findOne);

  // Delete a Flora Survey with id
  router.delete("/:id", verifyToken, flora_survey.delete);

  app.use('/api/flora_survey', router);
};