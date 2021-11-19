const express = require('express');
const Author = require('../schemas/authorSchema');
const router = express.Router();

//render EJS to view form to create author
router.get('/create', (req,res) => res.render('CreateAuthor'));

//create author
router.post('/create', (req,res) => {
    var authorName = {
        authorFirst: req.body.authorFirst,
        authorLast: req.body.authorLast
    }
    var authorBiography = req.body.authorBiography;
    var authorPublisher = req.body.authorPublisher;

    const newAuthor = new Author({
        authorName,
        authorBiography,
        authorPublisher
    });
    
    newAuthor.save((err,newAuthor) => {
        if (err) return console.log(err);
        console.log(newAuthor);
        res.send("Author was created!");
    })
});

//view all authors
router.get('/view', (req, res) => {
    Author.find() 
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
