const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    key: String,
    createdAt: Date,
    counts: [Number],
    value: String,
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
