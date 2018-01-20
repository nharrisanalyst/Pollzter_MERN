//answer
//votes
//question connects to a question

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;



var AnswersSchema = new Schema({
   answer: {type:String, req:true},
   votes : {type: Number, req:true, default:0},
   question: {type: String, req:true, ref:"Question"},
   id:{type: Schema.Types.ObjectId, req:true, ref:"Question"},
   _id:{type: Schema.Types.ObjectId, req:true, index: {unique:true}}
})



module.exports = mongoose.model('Answer', AnswersSchema);
