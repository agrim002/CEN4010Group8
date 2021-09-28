const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    bookISBN: {
        //type: String,
        //required: true
    }
});


const Rating = module.exports = mongoose.model('Rating', ratingSchema);

module.exports.get = function (callback, limit) {
    Rating.find(callback).limit(limit);
}