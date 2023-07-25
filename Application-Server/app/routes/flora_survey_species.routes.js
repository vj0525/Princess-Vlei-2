module.exports = app => {
  const flora_survey_species = require("../controllers/flora_survey_species.controller.js");
  const {verifyToken} = require("../auth/auth");

  var router = require("express").Router();

  //add a flora to a flora survey
  router.post("/", verifyToken, flora_survey_species.addSpecies);

  //get all flora survey ids that have the flora id specified
  router.get("/survey/:id", flora_survey_species.getBySurvey);

  //get all flora survey ids that have the flora id specified
  router.get("/flora/:id", flora_survey_species.getByFlora);

  app.use('/api/addflora', router);
};