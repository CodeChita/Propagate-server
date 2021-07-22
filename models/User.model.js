const { Schema, model } = require("mongoose");
const Plant = require("./Plant.model");

const userSchema = new Schema({
  username: {
		type: String,
	},
	firstName: String,
	lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  profileImageUrl: String,
  city: String,
  about: String,
  plantsOffered: {
    type: [Schema.Types.ObjectId],
    ref: Plant
  }
});



const User = model("User", userSchema);

module.exports = User;
