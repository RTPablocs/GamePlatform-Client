var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require("passport");
const User = require("../../models/user");
var auth = require('../auth');


//Obtener la informacion de un usuario

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){

    if(!user){ return res.sendStatus(401); }

    if(typeof req.body.user.points !== 'undefined'){
      user.points = req.body.user.points;
    }

    return user.save().then(function(){
      return res.json({user: user.toNewPoitnsJSON()});
    });
 
  }).catch(next);
});

//Actualizar datos user

router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
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
});

/* Para actualizar los puntos del user */

router.put('/points', auth.required, function(req, res, next){

  User.findById(req.payload.id).then(function(user){

    if(!user){ return res.sendStatus(401); }

    if(typeof req.body.points !== 'undefined'){
      user.points = req.body.points;
    }

    return user.save().then(function(){
      return res.json({user: user.toNewPoitnsJSON()});
    });

  }).catch(next);
});

// Para login, le pasamos email y password, devuelve -> email,username y token.

router.post('/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "Email error"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "Password error"}});
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
});


// Registro de nuevo usuario

router.post('/register', function(req, res, next){
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.image = req.body.user.image;
  user.points = req.body.user.points;
  user.setPassword(req.body.user.password);

  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

module.exports = router;
