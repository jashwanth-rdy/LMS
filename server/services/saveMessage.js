const Message = require("../models/message");

const saveMessage = (message, username, room, __createdtime__) => {
  return new Promise((resolve, reject) => {
    Message.create({ message, username, room, __createdtime__ })
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const getMessages = (room) => {
  return new Promise((resolve, reject) => {
    Message.find({ room })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

module.exports = { saveMessage, getMessages };
