const { Schema, model } = require("mongoose");
const Plant = require("./Plant.model");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
	firstName: String,
	lastName: String,
	googleId: String,
  
  username: String,
  passwordHash: String,
  profileImageUrl: String,
  city: {
    type: String,
    default: 'Amsterdam'
  },
  about: {
    type: String,
    default: null
  },
  plantsOffered: [{type: Schema.Types.ObjectId, ref: 'Plant', default: null}]
});

const User = model("User", userSchema);

module.exports = User;
