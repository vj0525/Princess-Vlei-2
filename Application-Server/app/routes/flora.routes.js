module.exports = app => {
  const flora = require("../controllers/flora.controller.js");
  const {verifyToken} = require("../auth/auth");

  var router = require("express").Router();

  // Create a new Organisms
  router.post("/", verifyToken, flora.create);

  // Create a new Organisms
  router.get("/", flora.findAll);

  // Retrieve all invasive Organisms
  router.get("/invasive", flora.findAllInvasive);

  // Retrieve a single Organism with id
  router.get("/:id", flora.findOne);

  // Delete a Organism with id
  router.delete("/:id", verifyToken, flora.delete);

  app.use('/api/flora', router);
};