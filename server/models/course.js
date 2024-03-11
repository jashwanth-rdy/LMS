const mongoose = require("mongoose");
const Inst = require("./instructor");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Inst",
  },
});

module.exports = mongoose.model("Course", courseSchema);
