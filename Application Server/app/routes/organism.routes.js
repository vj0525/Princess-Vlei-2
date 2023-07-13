module.exports = app => {
  const organism = require("../controllers/organism.controller.js");

  var router = require("express").Router();

  // Create a new Organisms
  router.post("/", organism.create);

  // Retrieve all Organisms
  router.get("/", organism.findAll);

  // Retrieve all invasive Organisms
  router.get("/invasive", organism.findAllInvasive);

  // Retrieve a single Tutorial with id
  router.get("/:orgID", organism.findOne);

  app.use('/api/organism', router);
};