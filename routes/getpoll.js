var express = require('express'),
    router = express.Router();
var mongoose = require('mongoose');


var Answers = require('../models/Answers');
var Question = require('../models/Question');




router.get('/getpoll',function(req,res,next){
     let id = req.query.id;
       console.log(id);

       let idCheck =mongoose.Types.ObjectId.isValid(id);

      if(idCheck){
     Question.findById(id).then(question=>{
          if(question!=null){
             res.status(200).json({
                                    success:true,
                                    question
                                      })
           }else{  question ={
               question:'',
               answers:[]
             };

             res.status(200).json({
                                    success:true,
                                    question
                                       })

           }})
      }else{
          let question ={
            question:'',
            answers:[]
          };

          res.status(200).json({
                                 success:true,
                                 question
                                    })



      }


})


module.exports = router;
