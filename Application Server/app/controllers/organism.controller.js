const Organism = require("../models/organism.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
	// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body.species)

  // Create a Tutorial
  const organism = new Organism({
  	species: "niger",
	genus: req.body.genus,
	common_name: req.body.common_name,
	conservation_status: req.body.conservation_status,
	alien: req.body.alien,
	invasive: req.body.invasive
  });

  console.log(organism)

  // Save Tutorial in the database
  Organism.create(organism, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organism."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
  
};

// find all published Tutorials
exports.findAllInvasive = (req, res) => {
  
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};