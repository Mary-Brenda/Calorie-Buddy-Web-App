// Import the necessary modules.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const {body, validationResult} = require('express-validator');
const port = process.env.PORT;

// Initialise the DB object with the neccessary settings.
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "root",
    database: "CalorieBuddy"
});

global.db = db;

app.use(bodyParser.urlencoded({extended: true}));

// Import the routes module.
require("./routes/main")(app);

app.use(express.static(__dirname + '/public'));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Calorie Buddy app listening on port ${port}!`));