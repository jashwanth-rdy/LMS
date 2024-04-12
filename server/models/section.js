const mongoose = require("mongoose");
const Course = require("./course");

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  name: {
    type: String,
    required: [true, "Title is required"],
  },
  lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
  course: {
    type: Schema.Types.ObjectId,
    ref: Course,
  },
});

module.exports = mongoose.model("Section", sectionSchema);
