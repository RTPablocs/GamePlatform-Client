var mongoose = require('mongoose');
const User = require("../models/user");
var passport = require("passport");


/* Cojer informacion usuario */

exports.getUser = async(req,res,next)=>{

    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
    
        return res.json({user: user.toProfileJSON()});
      }).catch(next);

}


/* Actualizar información de un usuario */


exports.updateUser = async(req,res,next)=>{

    User.findById(req.payload.id).then(function(user){
 
        if(!user){ return res.sendStatus(401); }

 
        if(typeof req.body.user.username !== 'undefined'){
          user.username = req.body.user.username;
        }
        if(typeof req.body.user.email !== 'undefined'){
          user.email = req.body.user.email;
        }
      
        if(typeof req.body.user.image !== 'undefined'){
          user.image = req.body.user.image;
        }
        if(typeof req.body.user.password !== 'undefined'){
          user.setPassword(req.body.user.password);
        }
        if(typeof req.body.user.points !== 'undefined'){
          user.points = req.body.user.points;
        }
    
        return user.save().then(function(){
          return res.json({user: user.toAuthJSON()});
        });
      }).catch(next);

}


/* Login usuario */

exports.userLogin = async(req,res,next)=>{

    if(!req.body.user.email){
        return res.status(422).json({errors: {email: "can't be blank"}});
      }
    
      if(!req.body.user.password){
        return res.status(422).json({errors: {password: "can't be blank"}});
      }
    
      passport.authenticate('local', {session: false}, function(err, user, info){
        if(err){ return next(err); }
    
        if(user){
          user.token = user.generateJWT();
          return res.json({user: user.toAuthJSON()});
        } else {
          return res.status(422).json(info);
        }
      })(req, res, next);

}


/* Register user */

exports.userRegister = async(req,res,next)=>{

    var user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.image = req.body.user.image;
    user.points = req.body.user.points;
    user.setPassword(req.body.user.password);
  
    user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    }).catch(next);

}


