//User id  //connect to User Id
//question //connects to Answers

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var QuestionSchema = new Schema({
   username :{type: String, ref: "User"},
   question:{type: String, req:true, ref: "Answer"},
   answers:[{answer: {type:String, req:true},
             votes : {type: Number, req:true, default:0}}]


})


module.exports = mongoose.model('Question', QuestionSchema);
