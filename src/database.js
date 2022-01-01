const mongoose = require("mongoose");
const config = require("./config/config");

exports.connect = () => {
  mongoose.connect(config.mongoose.url, config.mongoose.options);
};

// I would normally add error, disconnection handling here
