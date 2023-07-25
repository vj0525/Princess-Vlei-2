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

Flora_Survey_Species.getSurvey = (floraID, result) => {
  sql.query(`SELECT DISTINCT floraSID, floraID FROM Flora_Survey_Species WHERE floraID = ${floraID}`, (err, res) =>{
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Surveys: ", res);
    result(null, res);
  });
}

Flora_Survey_Species.getFlora = (floraSID, result) => {
  sql.query(`SELECT floraSID, floraID FROM Flora_Survey_Species WHERE floraSID = ${floraSID}`, (err, res) =>{
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Surveys: ", res);
    result(null, res);
  });
}

module.exports = Flora_Survey_Species;