module.exports = app => {
  const flora_survey_species = require("../controllers/flora_survey_species.controller.js");

  var router = require("express").Router();

  //add a flora to a flora survey
  router.post("/", flora_survey_species.addSpecies);

  app.use('/api/addflora', router);
};