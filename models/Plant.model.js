const { Schema, model } = require("mongoose");
const User = require("./User.model");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const plantSchema = new Schema({
  displayName: String,
  scientificName: String,
  commonName: [String],
  available: {
    type: Boolean,
    default: true
  },
  location: String,
  geoLocation: [Number],
  plantImageUrl: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Plant = model("Plant", plantSchema);

module.exports = Plant;
