const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
  },
  message: {
    type: String,
  },
  __createdtime__: {
    type: mongoose.Schema.Types.Date,
  },
});

module.exports = mongoose.model("Message", messageSchema);
