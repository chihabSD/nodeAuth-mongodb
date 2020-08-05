const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const logger = require("morgan");
const bodyParser = require("body-parser");
var sanitizer = require('sanitize')();
const expressSanitizer = require('express-sanitizer');
var cors = require('cors')

var path = require('path');
var cookieParser = require('cookie-parser')





//use api v1
const user = require("./routes/user");


require("dotenv").config(); // use dotenv (.env)

const app = express();

app.use(cookieParser()); 
app.use(cors())
app.disable('etag')

// -------- DB Config ------//
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/SNsocial", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// when connection occurs execute the function and
mongoose.connection.on("connected", () => {
  console.log("Connected to database"); 
});

//on error
mongoose.connection.on("error", err => {
  // if there is an error
  console.error(`Failed to connect to database: ${err}`); //display a message
});

// -------- Middleware------//
app.use(helmet());
app.use(logger("dev"));
// app.use('/uploads', express.static('uploads'))
//init passport

//init body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(require('sanitize').middleware);
app.use(expressSanitizer());




// -------- Routes ------//
app.use("/api", user); 




// -------- Errors ----- //
//Any error happens go to (err in the next function) and handle it
app.use((req, res, next) => {
  //create instance of error and give it a message
  var err = new Error("Page not found");
  err.status = 404; // error has property of 404
  next(err); // next handler
});

// handle any error here
app.use((err, req, res, next) => {
  // pass error status or interneral server error
  const status = err.status || 500;
  const error = err.message || "Error processing your request"; //err.message is coming from new Error object

  res.status(status).send({
    error
  });
});

module.exports = app;
