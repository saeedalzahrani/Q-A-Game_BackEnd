const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema ({
    answer:{
        type: Boolean,
        required: true
    },
    text:{
        type: String,
        required: true
    },    
},{
    timestamps: true
}
)
questionSchema.virtual('guesses', {
    ref: 'Guesse',
    localField: '_id',
    foreignField: 'refrence'
});

module.exports = mongoose.model('Question',questionSchema)