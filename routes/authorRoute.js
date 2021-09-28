const express = require('express');
const router = express.Router();
Author = require('../schemas/authorSchema');


router.get('/create', (req,res) => res.send('Create Author'));


router.get('/view', (req, res) => {
    Book.get(function (err, Book) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        res.json({
            message: "Books retrieved successfully",
            data: Book
        });
    });
});



module.exports = router;
