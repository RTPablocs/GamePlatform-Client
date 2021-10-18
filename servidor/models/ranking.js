const  mongoose  = require("mongoose");
const User = mongoose.model('User');
const infoScore = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId , ref:'User'},
    myScore:{type:Number},
    wins:{type:Number},
    lose:{type:Number}
})
const typeScore = mongoose.Schema({
    nameGame:{type:String},
    score:{type:String},
    wins:{type:Number},
    lose:{type:Number}
})
const singleScore = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId , ref:'User'},
    game:[typeScore],
    totalSore:{type:String},
    totalWins:{type:String},
    totalLose:{type:String}
})
const RankingSchema = mongoose.Schema({
    score:[infoScore],
    singleScore:[singleScore]

});
RankingSchema.plugin(uniqueValidator, {message: 'no se cumple el esquema!'});

module.exports = mongoose.model('Ranking',RankingSchema);
