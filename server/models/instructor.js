const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  refreshToken : String
});

instSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("Instructor", instSchema);
