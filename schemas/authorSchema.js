const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    authorName: {
        type: Object,
        required: true,
            authorFirst:{
                type: String,
                required: true
            },
            authorLast:{
                type: String,
                required: true
            }
    },
    authorBiography: {
        type: String,
        required: true
    },
    authorPublisher: {
        type: String
    }
});

const Author = module.exports = mongoose.model('Author', authorSchema);

module.exports.get = function (callback, limit) {
    Author.find(callback).limit(limit);
}
