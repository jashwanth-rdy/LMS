const mongoose = require("mongoose");
const Inst = require("./instructor");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  category: {
    type: String,

    enum: [
      "dev",
      "bus",
      "des",
      "mar",
      "hnf",
      "its",
      "pho",
      "mus",
      "fna",
      "lif",
      "oth",
    ],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  requirements: {
    type: String,
    required: [true, "Requirements are required"],
  },
  file: {
    type: String,
    required: [true, "Thumbnail is required"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  numofratings: {
    type: Number,
    default: 0,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: Inst,
  },
});

module.exports = mongoose.model("Course", courseSchema);
