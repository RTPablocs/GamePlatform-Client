const  mongoose  = require("mongoose");
const User = mongoose.model('User');
const typeScore = mongoose.Schema({
    id:{type:String},
    nameGame:{type:String},
    datePlay:{type:String},
    score:{type:Number}
})
const singleScore = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    game:[typeScore]
})
const RankingSchema = mongoose.Schema({
    singleScore:[singleScore]

});

module.exports = mongoose.model('Ranking',RankingSchema);
