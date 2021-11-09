var mongoose = require('mongoose');
var router = require('express').Router();
const Ranking = require('../../models/ranking');
var auth = require('../auth');

router.get('/general',async(req,res)=>{
    try{
        const ranking = await 
        Ranking.aggregate([
            {$unwind:"$singleScore"},
            {$unwind:"$game"},
            {totalScore:{$sum:"$score"}}
        ]);
        if(!ranking){
            res.status(409).send('Error');
        }
        res.json(ranking);
    }catch(e){
        console.log(e);
    }
});
router.get('/',async(req,res)=>{
    Ranking.find().then(function(data){
        res.json(data);
    })
})
router.get('/:id',async(req,res)=>{
    try{
                const ranking = await 
                Ranking.aggregate([
                    {$unwind:"$singleScore"},
                    {$unwind:"$game"},
                    {$match:{"id":req.params.id}},
                    {totalScoreGame:{$sum:"$score"}}
                ]);
                if(!ranking){
                    res.send('No se encontró el ranking del juego');
                }
                res.json(ranking);
    }catch(e){
        console.log(e)
    }
});
router.post('/', function(req, res, next){
    let rank;
    rank = new Ranking(req.body);
    rank.save().then(function(){
        return res.json(rank);
    });
});
router.post('/update',function(req,res){
    var id = req.payload.id;
    var idObject =  mongoose.Types.ObjectId(id);
    var date = new Date();
    var game = {
        "nameGame": req.body.nameGame,
        "datePlay": date,
        "score": req.body.score
    }
    var newUser = {
        "singleScore":{
            "user":id,
            "game":[
                game
            ]
        }
    }

    try{
        Ranking.aggregate()
        .unwind({path:"$singleScore"})
        .match({"singleScore.user":idObject})
        .then(function(data){
            if(data.length == 0){
                let rank;
                rank = new Ranking(newUser);
                rank.save().then(function(){
                    return res.json(rank);
                })
            }else{
                var idRank = mongoose.Types.ObjectId(data[0]._id);
                Ranking.findById(idRank).then(function(rank){
                    var games = rank.singleScore[0].game
                    console.log(rank.singleScore[0].game);
                    games.push(game);
                    rank.save().then(function(data){
                        return res.json(data);
                    })
                })
            }
        })

    }catch(e){
        throw e;
    }
})
  module.exports = router;