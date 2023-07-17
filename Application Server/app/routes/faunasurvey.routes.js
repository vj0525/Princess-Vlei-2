module.exports = app => {
    const faunasurvey = require("../controllers/faunasurvey.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Fauna Survey
    router.post("/", faunasurvey.create);

    //Modify an existing Fauna Survey
    router.put("/:id", faunasurvey.update);
  
    // Retrieve all Fauna Surveys
    router.get("/", faunasurvey.findAll);
  
    // Retrieve a single Fauna Survey with id
    router.get("/:id", faunasurvey.findOne);
  
    // Delete a Fauna Surcey with id
    router.delete("/:id", faunasurvey.delete);
  
    app.use('/api/faunasurvey', router);
  };