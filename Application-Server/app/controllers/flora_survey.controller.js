const Flora_Survey = require("../models/flora_survey.model.js");

// Create and Save a new Organism
exports.create = (req, res) => {
	// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Organism
  const flora_survey = new Flora_Survey({
    survey_date: req.body.survey_date,
    num_species: req.body.num_species,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    location: req.body.location,
    restiad: req.body.restiad,
    gramnoid: req.body.gramnoid,
    erica: req.body.erica,
    protea: req.body.protea,
    herbPen: req.body.herbPen,
    small_shrub: req.body.small_shrub,
    large_shrub: req.body.large_shrub,
    geophytes: req.body.geophytes,
    annual: req.body.annual,
    bare_ground: req.body.bare_ground
  });

  // Save Organism in the database
  Flora_Survey.create(flora_survey, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organism."
      });
    else res.send(data);
  });
};

// Retrieve all Flora Surveys from the database (with condition).
exports.findAll = (req, res) => {

  Flora_Survey.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Flora Surveys."
      });
    else res.send(data);
  });
};

exports.findAllInvasive = (req, res) => {
  Flora_Survey.getAllInvasive((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organisms."
      });
    else res.send(data);
  });
};

// Find a single Organism with a id
exports.findOne = (req, res) => {
    Flora_Survey.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flora_Survey with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flora_Survey with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Organism identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Flora_Survey.updateById(
    req.params.id,
    new Flora_Survey(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Flora with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Flora with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Organism with the specified id in the request
exports.delete = (req, res) => {
    Flora_Survey.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flora with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Flora with id " + req.params.id
        });
      }
    } else res.send({ message: `Flora was deleted successfully!` });
  });
};