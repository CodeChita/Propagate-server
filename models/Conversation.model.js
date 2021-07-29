const { Schema, model } = require("mongoose");
const User = require('./User.model')

let ConversationSchema = new Schema({
  participants: [{
      ref: 'User',
      type: Schema.Types.ObjectId
    },
  ] 
})

let ConversationModel = model('Conversation', ConversationSchema)

module.exports = ConversationModel