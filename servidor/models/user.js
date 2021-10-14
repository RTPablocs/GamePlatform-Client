const mongoose = require('mongoose');
var uniqueValidator = require("mongoose-unique-validator");

var jwt = require('jsonwebtoken'); // -> npm install jsonwebtoken



const UserSchema =  mongoose.Schema({
    
    username:{
        type: String, 
        lowercase: true, 
        unique: true, 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']
    },
    email:{
        type:String,
        required:true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    hash:{
        type:String,
        required:true
   
    },
    image:{
        type:String
    }
     
    


});


// Nos valida el esquema

UserSchema.plugin(uniqueValidator, {message: 'no se cumple el esquema!'}); // instalar -> npm install --save mongoose-unique-validator


UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
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
      image: this.image
    };
  };

module.exports = mongoose.model('User', UserSchema);