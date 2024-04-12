const mongoose = require("mongoose");

const instSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  refreshToken: String,
});

module.exports = mongoose.model("Instructor", instSchema);
