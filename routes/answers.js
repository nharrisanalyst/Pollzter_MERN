var express = require('express'),
    router = express.Router();


var Answer = require('../models/Answers');

router.get('/answers',function(req,res,next){
         let id = req.params.questionID

        Answer.find({'_id':id}).exec()
        .catch(function(err){console.log('error: '+err)})
        .then(answers=>{
          console.log(answers);
          //res.status(200).json(answers)
          res.json({
            succes:true
          })
        })







})




module.exports = router;
