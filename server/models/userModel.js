const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    min: 10,
    max: 12,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  loggedIn: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
