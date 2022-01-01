const mongoose = require("mongoose");
const config = require("./config/config");

exports.connect = async () => {
  mongoose.connect(config.mongoose.url, config.mongoose.options);
};

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
});
