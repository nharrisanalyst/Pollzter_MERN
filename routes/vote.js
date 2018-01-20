var express = require('express'),
    router = express.Router();


    var Answers = require('../models/Answers');
    var Question = require('../models/Question');


//router to get vote data for a question



router.post('/vote',function(req,res,next){
   let questionID =req.body.questionID;
   let answerID = req.body.answerID;
      console.log('answerID')
      console.log(answerID)
      console.log(questionID)
    Question.update({_id:questionID, "answers._id":answerID},{$inc:{'answers.$.votes':1 }}).exec().then(
       answer=>{
       res.status(200).json({
         success:true
       })
    }
     )


})

module.exports = router;
