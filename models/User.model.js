const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  nickname: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  profileImageUrl: String,
  city: String,
  about: String,
  plantsOffered: {
  }
});

const User = model("User", userSchema);

module.exports = User;
