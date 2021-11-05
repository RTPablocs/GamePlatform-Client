var router = require('express').Router();
const Ranking = require('../../models/ranking');

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
  module.exports = router;