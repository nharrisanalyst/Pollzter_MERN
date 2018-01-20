//id //connects to Question
//username  //bcrypt password and username
//password

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10;


var UserSchema = new Schema({
   _id: {type:Schema.Types.ObjectId, auto:true },
   username:{type: String, required: true, ref:'Question', index: {unique:true} },
   password: { type: String, required: true},
   email:{
     type:String,
     lowercase:true,
     unique:true,
     required:true
   },
   profile:{
     firstName:{type:String},
     lastName: {type: String}
   }

})

UserSchema.pre('save', function(next){
  let user = this;
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
    if(err) return next(err);

     //has the password
     bcrypt.hash(user.password,salt, function(err, hash){
       user.password=hash;
       next();

     });
  });
});


UserSchema.methods.comparePassword = function(candidatePassword,cb){
  bcrypt.compare(candidatePassword, this.password).then(function(isMatch){
     cb(null, isMatch);
  }).catch(function(err){cb(err)})
}

module.exports = mongoose.model('User', UserSchema);
