const express = require('express');
const router = express.Router();
Author = require('../schemas/authorSchema');

router.get('/create', (req,res) => res.render('CreateAuthor'));

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
