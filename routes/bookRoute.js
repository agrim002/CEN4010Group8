const express = require('express');
const router = express.Router();
Book = require('../schemas/bookSchema');

// Create book
router.get('/create', (req,res) => res.render('CreateBook'));
//router.get('/create', (req,res) => res.send('Page to Create Book'));
//router.get('/', (req,res) => res.render('Home'));
//router.get('/create', (req,res) => res.render('Home');

router.post('/create', (req, res) => {

    const book = new Book(req.body);
    
    // save the book and check for any errors
    book.save() 
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });

    console.log(book);
});


/*router.post('/create', (req, res) => {

    const book = new Book({
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
    }        
    );
    
    // save the book and check for any errors
    book.save() 
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });

    console.log(book);
});
*/
/*router.post('/create', (req, res) => {

    var book = new Book();

    book._id = req.body._id;
    book.bookISBN = req.body.bookISBN;
    book.bookName = req.body.bookName;
    book.bookDescription = req.body.bookDescription;
    book.bookPrice = req.body.bookPrice;
    book.bookAuthor = req.body.bookAuthor;
    book.bookGenre = req.body.bookGenre;
    book.bookPublisher = req.body.bookPublisher;
    book.bookPublishedYear = req.body.bookPublishedYear;
    book.bookCopiesSold = req.body.bookCopiesSold;
    book.bookRating = req.body.bookRating;
    
    // save the book and check for any errors
    book.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New book created!',
            data: book
        });
    });
});
*/

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

router.get('/view/genre', (req,res) => res.send('View by Genre'));
router.get('/view/top', (req,res) => res.send('View by Top Sellers'));
router.get('/view/rating', (req,res) => res.send('View by Rating'));
router.get('/view/number', (req,res) => res.send('View by Number of Books at a time'));

router.get('/view/ISBN', async (req, res) => {
    const ISBN = req.params.ISBN;
    const book = await Book.findOne({ISBN: ISBN});
    res.send(book);
});

router.get('/view/author', (req,res) => res.send('View by Author'));

module.exports = router;
