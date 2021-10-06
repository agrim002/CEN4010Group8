const express = require('express');
const Rating = require('../schemas/ratingSchema');
const router = express.Router();
//Rating = require('../schemas/ratingSchema');

router.get('/createRating', (req,res) => res.send('Create Rating'));
router.get('/createComment', (req,res) => res.send('Create Comment'));
//router.get('/view/sortByRating', (req,res) => res.send('Sort Ratings in descending order'));
    
router.get('/view/sortByRating', (req,res) => {
    Rating.find() 
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

});






module.exports = router;