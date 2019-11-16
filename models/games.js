const mongoose =  require('mongoose');

const gamesSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rating: {
        type :String,
        required : true
    }
});

module.exports = mongoose.model('Games', gamesSchema);
