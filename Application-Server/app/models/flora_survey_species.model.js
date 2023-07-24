const sql = require("./db.js");

const Flora_Survey_Species = function(flora_survey_species) {
  this.floraSID = flora_survey_species.floraSID;
  this.floraID = flora_survey_species.floraID;
};

Flora_Survey_Species.addSpecies = (newFloraSurveySpecies, result) => {
  sql.query("INSERT INTO Flora_Survey_Species SET ?", newFloraSurveySpecies, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("added Species: ", { ...newFloraSurveySpecies });
    result(null, { ...newFloraSurveySpecies });
  });
};

module.exports = Flora_Survey_Species;