const Flora_Survey_Species = require("../models/flora_survey_species.model.js");

// Create and Save a new Organism
exports.addSpecies = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Organism
  const flora_survey_species = new Flora_Survey_Species({
    floraSID: req.body.floraSID,
    floraID: req.body.floraID
  });

  // Save Organism in the database
  Flora_Survey_Species.addSpecies(flora_survey_species, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organism."
      });
    else res.send(data);
  });
};