const mongoose = require("mongoose");
const Section = require("./section");

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  file: {
    type: String,
    required: [true, "file name is required"],
  },
  path: {
    type: String,
    required: [true, "file Path is required"],
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: Section,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);
