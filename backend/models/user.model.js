const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return /^https?:\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]{2,}(\/[a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=-]+)*\/?#?$/.test(
          v
        );
      },
      message: (props) => `${props.value} não é uma URL válida`,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
