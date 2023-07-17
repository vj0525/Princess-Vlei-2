module.exports = app => {
  const flora = require("../controllers/flora.controller.js");

  var router = require("express").Router();

  // Create a new Organisms
  router.post("/", flora.create);

  /*
  // Retrieve all Organisms
  router.get("/", flora.findAll);
  */

  // Retrieve all invasive Organisms
  router.get("/invasive", flora.findAllInvasive);

  // Retrieve a single Organism with id
  router.get("/:orgID", flora.findOne);

  // Delete a Organism with id
  router.delete("/:id", flora.delete);

  app.use('/api/flora', router);
};