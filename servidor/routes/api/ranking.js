var router = require('express').Router();
const Ranking = require('../../models/ranking');

router.get('/',async(req,res)=>{
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