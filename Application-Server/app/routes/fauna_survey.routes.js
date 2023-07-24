module.exports = app => {
    const fauna_survey = require("../controllers/fauna_survey.controller.js");
    const {verifyToken} = require("../auth/auth");
  
    var router = require("express").Router();
  
    // Create a new Fauna Survey
    router.post("/", verifyToken, fauna_survey.create);

    //Modify an existing Fauna Survey
    router.put("/:id", verifyToken, fauna_survey.update);
  
    // Retrieve all Fauna Surveys
    router.get("/", fauna_survey.findAll);
  
    // Retrieve a single Fauna Survey with id
    router.get("/:id", fauna_survey.findOne);
  
    // Delete a Fauna Surcey with id
    router.delete("/:id", verifyToken, fauna_survey.delete);
  
    app.use('/api/fauna_survey', router);
  };