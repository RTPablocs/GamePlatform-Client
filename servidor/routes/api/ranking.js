var mongoose = require('mongoose');
var router = require('express').Router();
const Ranking = require('../../models/ranking');
var auth = require('../auth');

/**Get User Score */
router.post('/user/score',async(req,res)=>{
    var id = req.payload.id;
    try{
        Ranking.aggregate([
            {$unwind:{path:"$singleScore.game"}},
            {$match:{"singleScore.user":id}},
            {$group:{_id:{"singleScore":"$singleScore.user"},
            totalScore:{$sum:"$singleScore.game.score"}}}
        ]).then(function(data){
            res.json(data);
        });
    }catch(e){
        console.log(e);
    }
});
/**Get all information of ranking */
router.get('/',async(req,res)=>{
    Ranking.find().then(function(data){
        res.json(data);
    })
});
/** Get the information of a single ranking */
router.post('/game',async(req,res)=>{
    var name = req.body.game;
    try{
        Ranking.aggregate([
            {$unwind:{path:"$singleScore.game"}},
            {$match:{"singleScore.game.nameGame":name}}
        ]).then(function(data){
            res.json(data);
        });
    }catch(e){
        console.log(e);
    }
})
/**Get the games that users has play */
router.get('/single',async(req,res)=>{
    try{
        Ranking.aggregate([{
            $unwind:{path:"$singleScore.game"}
        },
        {$group:{_id:{"nameGame":"$singleScore.game.nameGame"}}}
    ]).then(function(data){
            res.json(data);
        })
    }catch(e){
        res.status(409).send('Error');
    }
});
/**Create a new Score */
router.post('/', function(req, res, next){
    let rank;
    rank = new Ranking(req.body);
    rank.save().then(function(){
        return res.json(rank);
    });
});
/**Update the score of users */
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
                    var games = rank.singleScore.game
                    console.log(rank.singleScore.game);
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