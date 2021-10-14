var router = require('express').Router();
var mongoose = require('mongoose');

// Modelo de user
const User = require("../../models/user");


// GET -> Seleccionar todos los productos

router.get("/", async (req, res) => {

    try {
      const user = await User.find();
      console.log(res);
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el GET de user!!");
    }
});



// GET ONE -> Seleccionamos solo un user 

router.get("/:username", async (req, res) => {

  try {

    let user;
    user = await User.findOne({username : req.params.username}); // buscamos por slug

    if(user){
      res.json(user.username);
    }else{
      res.status(500).send("No existe el usuario!!");
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el GET de user!!");
  }
});

//POST -> Crear nuevo user

router.post("/", async (req, res) => {

  try {
      let user;

      user = new User(req.body);
      await user.save();
      res.send(user);
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Error en crear nuevo user!!');
  }
});

// DELTE -> Borramos user, lo buscamos por id y si existe, lo borramos

router.delete("/:id", async (req, res) => {

    try {
      let user = await User.findById(req.params.id);

      if(!user) {
          res.status(404).json({ msg: 'No existe el user'})
      }else{

        await User.findOneAndRemove({ _id:req.params.id})

        res.json({ msg: 'User eliminado con éxito!' })
      }

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al borrar el user');
    }

 });




  module.exports = router;