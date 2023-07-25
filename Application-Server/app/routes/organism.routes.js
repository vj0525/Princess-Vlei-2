module.exports = app => {
  const organism = require("../controllers/organism.controller.js");
  const {verifyToken} = require("../auth/auth");

  var router = require("express").Router();

  // Create a new Organisms
  router.post("/", verifyToken, organism.create);

  // Create a new Organisms
  router.put("/:id", verifyToken, organism.update);

  // Retrieve all Organisms
  router.get("/", organism.findAll);

  // Retrieve all Organisms
  router.get("/noflora", organism.findSpecific)

  // Retrieve all invasive Organisms
  router.get("/invasive", organism.findAllInvasive);

  // Retrieve a single Organism with id
  router.get("/:id", organism.findOne);

  // Delete a Organism with id
  router.delete("/:id", verifyToken, organism.delete);

  app.use('/api/organism', router);
};