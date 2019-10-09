const mongoose = require('mongoose')
// const Schema = mongoose.Schema

const guessesSchema = new mongoose.Schema({
    choice: {
      type: Boolean,
      required: true
    },
    //foreign key from user model
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    refrence:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    correct:{
      type: Boolean,
      required: true
    }
  },
   {
    timestamps: true
  });
//virtual to connect the question and send foreign key

 
module.exports = mongoose.model('Guesse', guessesSchema)
