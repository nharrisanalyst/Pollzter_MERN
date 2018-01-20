var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    config = require('../config/main');

var Questions = require('../models/Question');


router.get('/questions', passport.authenticate('jwt',{ session: false }), function(req,res){
    let user = req.query.user;
        console.log(req.query)
        console.log(user);
     Questions.find({username:user}).then(
     questions => {
       //reversing the question array so that newest question are on top
               questions.reverse();
               return questions;
         }).then(questions =>res.status(200).json({
                                        success:true,
                                        questions})
                 )





        })

module.exports = router;
