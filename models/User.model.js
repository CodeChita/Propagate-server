const { Schema, model } = require("mongoose");
const Plant = require("./Plant.model");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
	firstName: String,
	lastName: String,
	googleId: String,
  
  username: String,
  passwordHash: String,
  profileImageUrl: String,
  city: String,
  about: String,
  plantsOffered: [{type: Schema.Types.ObjectId, ref: 'Plant'}]
});

const User = model("User", userSchema);

module.exports = User;
