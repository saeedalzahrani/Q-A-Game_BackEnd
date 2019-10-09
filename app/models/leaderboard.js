const mongoose = require('mongoose')

const leaderboardSchema = new mongoose.Schema ({
    owner:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    },    
},{
    timestamps: true
}
)


module.exports = mongoose.model('leaderboard',leaderboardSchema)