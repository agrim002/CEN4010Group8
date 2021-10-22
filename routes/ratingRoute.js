const { Timestamp } = require('bson');
const express = require('express');
const { rawListeners } = require('../schemas/ratingSchema');
const Rating = require('../schemas/ratingSchema');
const router = express.Router();
//Rating = require('../schemas/ratingSchema');

router.get('/create', (req,res) => res.render('CreateRating'));


router.post('/create', (req,res) => {
    var bookName = req.body.bookName;
    var bookRating = req.body.bookRating;
    var bookComment = req.body.bookComment;

    const newRating = new Rating({
        bookName,
        bookRating,
        bookComment
    });
    
    newRating.save((err,newRating) => {
        if (err) return console.log(err);
        console.log(newRating);
        res.send("Rating was created!");
    })
});

router.get('/view/sortByRating', (req,res) => {
    Rating.find() 
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

});


//router.get('/createComment', (req,res) => res.send('Create Comment'));
//router.get('/view/sortByRating', (req,res) => res.send('Sort Ratings in descending order'));

//checking to find rating by book
//router.get('/find', (req,res) => res.render('FindRating'));


router.get('/find/bookName/:bookName', async (req,res) => {

    
    var book = req.params.bookName;
    //const bookResults = await Rating.find({bookName: book});
    //res.send(bookResults);
    
    /*
    var book = req.params.bookName;
    const fiveResults = await Rating.find({bookName: book, bookRating: 5});
    res.send(fiveResults);
    const fourResults = await Rating.find({bookName: book, bookRating: 4});
    res.send(fourResults);
    */
    /*
    const rateResults = bookResults.map(bookResults => bookResults.bookRating);
    const sortedRates = rateResults.sort(function(a, b) {return b-a});
    res.send(sortedRates);
    */

    const bookResults = await Rating.find({bookName: book}).sort({bookRating: -1});
    
    res.send(bookResults);

    

    
    
    
    
     



    


});







module.exports = router;