var express = require('express'),
    router = express.Router(),
    passport = require('passport')
    config = require('../config/main');


var Question =require('../models/Question');


 var JWTPassport = passport.authenticate('jwt',{session:false, badRequestMessage : 'Unauthorized'});


router.post('/createvote', JWTPassport,function(req,res){
          console.log('authorized')
          console.log(req.user.username);

       let username =req.user.username;
       let answers = req.body.answers;
       let question = req.body.question;
       let votes = 0;
       console.log(typeof answers);
       console.log(answers)
       console.log('here');
       var answerDocuments = answers.map(function(val,i){
            return{
              answer:val,
              votes:votes
            }
       })
        console.log(answerDocuments);
       let questionNew = new Question({
         username:username,
         question:question,
         answers: answerDocuments
       })

       console.log(questionNew)

       var savePromise = questionNew.save()

       savePromise.then(
          result=>{
            console.log('here2');
            res.status(200).json({success:true});
         })


})


router.get('/createvote',function(req,res){

  res.send('working')
  res.end();
})

module.exports = router;
