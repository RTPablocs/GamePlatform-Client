const mongoose = require('mongoose');
var uniqueValidator = require("mongoose-unique-validator");
var crypto = require("crypto");
var jwt = require('jsonwebtoken'); // -> npm install jsonwebtoken
var secret = require("../config").secret;


const UserSchema =  mongoose.Schema({
    
    username:{
        type: String, 
        lowercase: true, 
        unique: true
    },
    email:{
        type:String,
        required:true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    hash:String,
    salt:String,
    image:{
        type:String
    },
    points:{
      type:Number,
      default: 0
    }
     

},
{timestamps:true});


// Nos valida el esquema

UserSchema.plugin(uniqueValidator, {message: 'no se cumple el esquema!'}); // instalar -> npm install --save mongoose-unique-validator



UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };


UserSchema.methods.toAuthJSON = function(){
    return {
      username: this.username,
      email: this.email,
      token: this.generateJWT(),
      points:this.points
    };
  };


/* Para mostrar perfil */

UserSchema.methods.toProfileJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    points : this.points,
    image: this.image
  };
};

UserSchema.methods.toNewPoitnsJSON = function(){
  return {
    username: this.username,
    points : this.points
  };
};

module.exports = mongoose.model('User', UserSchema);