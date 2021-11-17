var mongoose = require('mongoose');
var router = require('express').Router();
const User = require("../../models/user");
var auth = require('../auth');
var userController = require ('../../controllers/userController');


router.get('/user',userController.getUser);  /* To get user info */


router.post('/user',auth.required,userController.updateUser); /* To update user info */

router.post('/login',userController.userLogin); /* To login user */

router.post('/register',userController.userRegister); /* To register new user */

module.exports = router;
