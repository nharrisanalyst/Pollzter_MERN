var express = require('express'),
  router= express.Router(),
  crypto = require('crypto'),
  jwt = require("jsonwebtoken"),
  User = require('../models/User'),
  config = require('../config/main'),
  passport = require('passport'),
  passportService = require('../config/passport'),
  config = require('../config/main'),
  dbAddress = config.mongoDB,
  mongoose = require('mongoose');


//creating a jwt

function generateToken(userInfo){
  return jwt.sign(userInfo, config.secret,{
    expiresIn:10000
  });
}

//login genereate generateToken
function generateTokenLogin(){
  return jwt.sign({}, config.secret,{
    expiresIn:10000
  });
}
//function for setting user userInfo

function setUserInfo(request){
  return{
    _id:request._id,
    userName: request.username,
    firstName: request.profile.firstName,
    lastName : request.profile.lastName,
    email : request.email
  }

}

//formatName
function formatName(profile){
   let firstName = profile.firstName;
   let lastName = profile.lastName;

    firstName=firstName.split('');
    firstName[0]=firstName[0].toUpperCase();
    firstName = firstName.join('');

    lastName=lastName.split('');
    lastName[0]=lastName[0].toUpperCase();
    lastName=lastName.join('');

    const fullName = firstName+' '+lastName;

    return fullName;
}


//regiser user and send a jwt token back to the user to servce the whole api

router.post('/register',function(req,res,next){
   //registeration checks

   console.log(req.body);
   const email = req.body.email;
   const username = req.body.username;
   const firstName = req.body.firstname;
   const lastName = req.body.lastname;
   const password = req.body.password;
   //return error if validation is not here

   if(!email){
     return res.status(422).send({err: 'You must enter an email address'});
   }

   if(!username){
     return res.status(422).send({err: 'You must enter a username'});
   }
   if(!firstName || !lastName){
     return res.status(422).send({err:"You must enter your name"});
   }

   if(!password){
     return res.status(422).send({err: 'You must enter a password'});
   }

  //connect to the database


  console.log('here');

    //checking to make sure that the email is unique

   User.findOne({email:email}, function(err, existingUser){
     if(err){return next(err)}

     if(existingUser){
       return res.status(422).send({err: 'That email address is already in use'})
     }
     //if user is unique and password has been provided we are going to register the user

     let user = new User({
       email:email,
       username:username,
       password:password,
       profile:{firstName:firstName, lastName:lastName}
     });
        console.log('user');
     user.save(function(err,user){
       if(err){return next(err)}

       let userInfo = setUserInfo(user);

        res.status(201).json({
          success:true,
          token: generateToken(userInfo)
        })

       res.end();
     })

   })


})
//localloginstrategy for passport

var loginPassport = passport.authenticate('local',{session:false, badRequestMessage : 'User Name or Password is invalid.'});

router.post('/login',loginPassport, function(req,res,next){
  //let userInfo = setUserInfo(req.user);
  console.log(req.user)
  const userInfo = setUserInfo(req.user);
  //const userName = req.user.username

  res.status(200).json({
    success: true,
    userName: req.user.username,
    name: formatName(req.user.profile),
    token: generateToken(userInfo)


  });

})



router.get('/register',function(req,res,next){
  res.send('working');
  res.end();
})

router.get('/login', function(req, res) {

    res.send();
});
module.exports = router;
