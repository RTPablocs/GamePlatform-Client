var router = require('express').Router();
const Ranking = require('../../models/ranking');

router.get('/',async(req,res)=>{
    try{
        const ranking = await Ranking.find();
        res.json(ranking);
    }catch(e){
        console.log('Error al leer el ranking general',e);
    }
});
router.get('/:id',async(req,res)=>{
    try{

    }catch(e){
        
    }
});