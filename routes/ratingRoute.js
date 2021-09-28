const express = require('express');
const router = express.Router();
Rating = require('../schemas/ratingSchema');

router.get('/createRating', (req,res) => res.send('Create Rating'));
router.get('/createComment', (req,res) => res.send('Create Comment'));
router.get('/view/sortByRating', (req,res) => res.send('Sort Ratings in descending order'));
router.get('/getAverage', (req,res) => res.send('Gets Average Rating'));

module.exports = router;