var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local');

var User = require('../models/User');
var config = require('../config/main');

const localOptions = {usernameField:'email'};

const localLogin = new LocalStrategy(localOptions,function(email,password,done){

  User.findOne({email:email},function(err,user){
    if(err){ return done(err);}


    if(!user){return done(null, false, {error: 'Your login details could not be confirmed Please try again'})}

    user.comparePassword(password, function(err, isMatch){
      if(err){return done(err);}
      if(!isMatch){return done(null, false, { error: 'Your login details could not be verified Please try again'});}

      return done(null, user);
    });
  });
});




const jwtOptions={
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : config.secret
}


const jwtLogin = new JwtStrategy(jwtOptions, function(jwt_payload,done){
     let username = jwt_payload.userName;
  User.findById(jwt_payload._id,function(err,user){

    if(err){return done(err,false);}
    if(user){
      return done(null,user);
    }else{
      return done(null,false);
    }
  });
});


const strategies = {
  local : localLogin,
  Jwt : jwtLogin
}

module.exports = strategies;
