const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const routes = require("./routes/v1");
const database = require("./database");
const config = require("./config/config");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());
app.use(mongoSanitize());

app.use(compression());

app.use(cors());
app.options("*", cors());

app.use("/v1", routes);

database.connect();

app.use(function (err, req, res, next) {
  if (config.env !== "test") {
    // send to third party services if applicable
    res.status(500).send("Something went wrong");
  } else {
    res.status(500).send(err.message);
  }
});

// todo handle error

module.exports = app;
