/* PLEASE RUN npm install express mysql cors --save BEFORE RUNNING*/

const express = require("express");
const cors = require("cors");
require('dotenv').config({path: __dirname + '/.env'})

const app = express();

/*
var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8081"]
};
*/

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to princess vlei database application." });
});

app.on('error', function (exc) {
    sys.log("ignoring exception: " + exc);
});

require("./app/routes/organism.routes.js")(app);
require("./app/routes/fauna_survey.routes.js")(app);
require("./app/routes/flora.routes.js")(app);
require("./app/routes/flora_survey.routes.js")(app);
require("./app/routes/flora_survey_species.routes.js")(app);
require("./app/routes/education.routes.js")(app);
require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});