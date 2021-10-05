const express = require('express');
const Book = require('../schemas/bookSchema');
const router = express.Router();

// Create book page to render EJS doc
router.get('/create', (req,res) => res.render('CreateBook'));

router.post('/create', (req, res) => {
    //create variable for each field to then add to database
    var bookISBN = req.body.bookISBN;
    var bookName = req.body.bookName;
    var bookDescription = req.body.bookDescription;
    var bookPrice = req.body.bookPrice;
    var bookAuthor = req.body.bookAuthor;
    var bookGenre = req.body.bookGenre;
    var bookPublisher = req.body.bookPublisher;
    var bookPublishedYear = req.body.bookPublishedYear;
    var bookCopiesSold = req.body.bookCopiesSold;
    var bookRating = req.body.bookRating;

    //build book to add to database
    const newBook = new Book({
        bookISBN,
        bookName,
        bookDescription,
        bookPrice,
        bookAuthor,
        bookGenre,
        bookPublisher,
        bookPublishedYear,
        bookCopiesSold,
        bookRating
    });
    
    // save the book and check for any errors
    newBook.save((err,newBook) => {
        if (err) return console.log(err);
        console.log(newBook);
        res.send("Book was created!");
    })
});


//view all books
router.get('/view', (req, res) => {
    Book.find() 
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//view books by genre
router.get('/view/genre/:genre', async (req, res) => {
    const genre = req.params.genre;
    const book = await Book.find({bookGenre: genre});
    res.send(book);
});

//view top 10 bestseller books based on books sold
router.get('/view/top', async (req, res) => {
    const top = 10;
    const book = await Book.find().sort({bookCopiesSold:-1}).limit(top);
    res.send(book);
});

//view books of certain rating and higher
router.get('/view/rating/:rating', async (req, res) => {
    const rating = req.params.rating;
    const book = await Book.find({bookRating: {$gte :rating}}).sort({bookRating:-1});
    res.send(book);
});

//Do we need this? This can be an input to ask how many books to display at a time
router.get('/view/number', (req,res) => res.send('View by Number of Books at a time'));
//view certain number of books at a time sorted by book name
//might need to clarify functionality with professor
router.get('/view/number/:number', async (req, res) => {
    const number = parseInt(req.params.number,10);
    const book = await Book.find().sort({bookName:1}).limit(number);
    res.send(book);
});

//view books by ISBN
router.get('/view/ISBN/:ISBN', async (req, res) => {
    const ISBN = req.params.ISBN;
    const book = await Book.findOne({bookISBN: ISBN});
    res.send(book);
});

//view books by Author
router.get('/view/author/:author', async (req, res) => {
    const author = req.params.author;
    const book = await Book.find({bookAuthor: author});
    res.send(book);
});

module.exports = router;
