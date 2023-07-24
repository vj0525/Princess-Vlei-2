const sql = require("./db.js");

// constructor
const Flora_Survey = function(flora_survey) {
  this.survey_date = flora_survey.survey_date;
  this.num_species = flora_survey.num_species;
  this.latitude = flora_survey.latitude;
  this.longitude = flora_survey.longitude;
  this.location = flora_survey.location;
  this.restiad = flora_survey.restiad;
  this.gramnoid = flora_survey.gramnoid;
  this.erica = flora_survey.erica;
  this.protea = flora_survey.protea;
  this.herbPen = flora_survey.herbPen;
  this.small_shrub = flora_survey.small_shrub;
  this.large_shrub = flora_survey.large_shrub;
  this.geophytes  = flora_survey.geophytes;
  this.annual = flora_survey.annual;
  this.bare_ground = flora_survey.bare_ground;
};

Flora_Survey.create = (newFloraSurvey, result) => {
  sql.query("INSERT INTO Flora_Survey SET ?", newFloraSurvey, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Flora_Survey: ", { floraSID: res.insertId, ...newFloraSurvey });
    result(null, { floraSID: res.insertId, ...newFloraSurvey });
  });
};

Flora_Survey.findById = (floraSID, result) => {
  sql.query(`SELECT * FROM Flora_Survey WHERE floraSID = ${floraSID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Flora_Survey: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Flora with the id
    result({ kind: "not_found" }, null);
  });
};

Flora_Survey.getAll = (result) => {
  let query = "SELECT * FROM Flora_Survey";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Flora Surveys: ", res);
    result(null, res);
  });
};

Flora_Survey.getAllInvasive = result => {
  sql.query("SELECT * FROM Flora_Survey NATURAL JOIN Organism WHERE invasive = true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Flora_Survey: ", res);
    result(null, res);
  });
};

Flora_Survey.updateById = (floraSID, Flora_Survey, result) => {
  sql.query(
    "UPDATE Flora_Survey SET survey_date = ?, num_species = ?, latitude = ?, longitude = ?, location = ?, restiad = ?, gramnoid = ?, erica = ?, protea = ?, herbPen = ?, small_shrub = ?, large_shrub = ?, geophytes = ?, annual = ? WHERE floraSID = ?",
    [Flora_Survey.growth_form, Flora_Survey.num_species, Flora_Survey.growing_method, Flora_Survey.veg_type, Flora_Survey.location, Flora_Survey.restiad, Flora_Survey.gramnoid, Flora_Survey.erica, Flora_Survey.protea, Flora_Survey.herbPen, Flora_Survey.small_shrub, Flora_Survey.large_shrub, Flora_Survey.geophytes, Flora_Survey.annual, Flora_Survey.bare_ground, floraSID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Organism with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Flora_Survey: ", { floraSID: floraSID, ...Flora_Survey });
      result(null, { floraSID: floraSID, ...Flora_Survey });
    }
  );
};

Flora_Survey.remove = (id, result) => {
  sql.query("DELETE FROM Flora_Survey WHERE floraSID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Organism with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Flora Survey with id: ", id);
    result(null, res);
  });
};

module.exports = Flora_Survey;