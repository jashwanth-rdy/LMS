const mongoose = require("mongoose");
const Course = require("./course");
const Stud = require("./student");

const Schema = mongoose.Schema;

const enrollSchema = new mongoose.Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: Course,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: Stud,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Enroll", enrollSchema);
