const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookISBN: {
        type: String,
        required: true,
    },
    bookName: {
        type: String,
        required: true
    },
    bookDescription: {
        type: String,
        required: true
    },
    bookPrice: {
        type: Number,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookGenre: {
        type: String
    },
    bookPublisher: {
        type: String,
        required: true
    },
    bookPublishedYear: {
        type: Number,
        required: true
    },
    bookCopiesSold: {
        type: Number,
        required: true
    },
    allRatings: {
        type: Array,
        ratingDate: {
            type: Date
        },
        rating: {
             type: Number
        },
        comment: {
            type: String
        }
    }
});

const Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.get = function (callback, limit) {
    Book.find(callback).limit(limit);
}
