const sql = require("./db.js");

// constructor
const Organism = function(organism) {
  this.species = organism.species;
  this.genus = organism.genus;
  this.common_name = organism.common_name;
  this.conservation_status = organism.conservation_status;
  this.alien = organism.alien;
  this.invasive = organism.invasive;
};

Organism.create = (newOrganism, result) => {
  sql.query("INSERT INTO organism SET ?", newOrganism, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Organism: ", { orgID: res.insertId, ...newOrganism });
    result(null, { orgID: res.insertId, ...newOrganism });
  });
};

Organism.findById = (orgID, result) => {
  sql.query(`SELECT * FROM organism WHERE orgID = ${orgID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Organism: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Organism with the id
    result({ kind: "not_found" }, null);
  });
};

Organism.getAll = (common_name, result) => {
  let query = "SELECT * FROM organism";

  if (common_name) {
    query += ` WHERE common_name LIKE '%${common_name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Organisms: ", res);
    result(null, res);
  });
};

Organism.getAllInvasive = result => {
  sql.query("SELECT * FROM organism WHERE invasive=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("organisms: ", res);
    result(null, res);
  });
};

/*
Organism.updateById = (orgID, Organism, result) => {
  sql.query(
    "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
    [Organism.title, Organism.description, Organism.published, id],
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

      console.log("updated Organism: ", { id: id, ...Organism });
      result(null, { id: id, ...Organism });
    }
  );
};


Organism.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
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

    console.log("deleted Organism with id: ", id);
    result(null, res);
  });
};

Organism.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};
*/
module.exports = Organism;