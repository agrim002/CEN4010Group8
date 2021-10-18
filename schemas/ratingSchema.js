const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({ 
    bookName: {
        type: String,
        required: true
    },
    
    bookRating: {
        type: String,
        required: true
},

    bookComment: {
        type: Object,
        required: true
},
    DateStamp: {
        type: Date,
        default: Date.now
    }

});




const Rating = module.exports = mongoose.model('Rating', ratingSchema);

module.exports.get = function (callback, limit) {
    Rating.find(callback).limit(limit);
}