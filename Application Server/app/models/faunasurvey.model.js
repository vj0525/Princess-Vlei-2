const sql = require("./db.js");

// constructor
const FaunaSurvey = function(faunasurvey) {
  this.faunaID = faunasurvey.faunaID;
  this.survey_date = faunasurvey.survey_date;
  this.sex = faunasurvey.sex;
  this.latitude = faunasurvey.latitude;
  this.longitude = faunasurvey.longitude;
  this.activity = faunasurvey.activity;
  this.life_stage = faunasurvey.life_stage;
};

FaunaSurvey.create = (newFaunaSurvey, result) => {
  sql.query("INSERT INTO Fauna_Survey SET ?", newFaunaSurvey, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Fauna Survey: ", { faunaID: res.insertId, ...newFaunaSurvey });
    result(null, { faunaID: res.insertId, ...newFaunaSurvey });
  });
};

FaunaSurvey.findById = (faunaID, result) => {
  sql.query(`SELECT * FROM Fauna_Survey WHERE faunaID = ${faunaID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Fauna Survey: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Fauna Survey with the id
    result({ kind: "not_found" }, null);
  });
};

FaunaSurvey.getAll = (result) => {
  let query = "SELECT * FROM Fauna_Survey";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Fauna Surveys: ", res);
    result(null, res);
  });
};


FaunaSurvey.updateById = (faunaID, Organism, result) => {
  sql.query(
    "UPDATE Fauna_Survey SET survey_date = ?, sex = ?, latitude = ?, longitude = ?, activity = ?, life_stage = ? WHERE faunaID = ?",
    [Organism.survey_date, Organism.sex, Organism.latitude, Organism.longitude, Organism.activity, Organism.life_stage, faunaID],
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

      console.log("updated Fauna Survey: ", { faunaID: faunaID, ...FaunaSurvey });
      result(null, { faunaID: faunaID, ...FaunaSurvey });
    }
  );
};

FaunaSurvey.remove = (id, result) => {
  sql.query("DELETE FROM Fauna_Survey WHERE faunaID = ?", id, (err, res) => {
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

    console.log("deleted Fauna Survey with id: ", id);
    result(null, res);
  });
};

module.exports = FaunaSurvey;