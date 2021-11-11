const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    bookComment: {
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
}
        
});


const Rating = module.exports = mongoose.model('Rating', ratingSchema);

module.exports.get = function (callback, limit) {
    Rating.find(callback).limit(limit);
}