const express = require('express');
const Book = require('../schemas/bookSchema');
const User = require('../schemas/userSchema');
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
    //var bookRating = req.body.bookRating;

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
        //bookRating
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
router.get('/view/genre/', async (req, res) => res.render('viewByGenre'));
router.get('/view/genre/:genre', async (req, res) => {
    const genre = req.params.genre;
    const book = await Book.find({allRatings: genre});
    res.send(book);
});



//view top 10 bestseller books based on books sold
router.get('/view/top', async (req, res) => {
    const top = 10;
    const book = await Book.find().sort({bookCopiesSold:-1}).limit(top);
    res.send(book);
});

//view books of certain rating and higher
router.get('/view/rating/', async (req, res) => res.render('viewByRating'));
router.get('/view/rating/:rating', async (req, res) => {
    const rating = parseInt(req.params.rating);
    const bookArray = [];
    const pipeline = [
        {
          '$unwind': {
            'path': '$allRatings', 
            'includeArrayIndex': 'string', 
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$group': {
            '_id': '$bookName', 
            'averageRating': {
              '$avg': '$allRatings.rating'
            }
          }
        }, {
          '$match': {
            'averageRating': {
              '$gte': rating
            }
          }
        }, {
          '$sort': {
            'averageRating': -1
          }
        }
      ];
    
      const aggCursor = Book.aggregate(pipeline);
      (await aggCursor).forEach(book => {
          bookArray.push(`Book: ${book._id}, Average Rating: ${book.averageRating}`);    
      });

      res.send(bookArray);
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


//Combined form of rating and comment 
router.get('/rateBook', (req,res) => res.render('RateABook'));
router.post('/rateBook', async (req, res) => {
    const bookName = req.body.bookName;
    const bookRating = req.body.bookRating;
    const bookComment = req.body.bookComment;
    const ratingUser = req.body.ratingUser;

    var newBookRating = {
        ratingDate: new Date(),
        rating: parseInt(bookRating),
        comment: bookComment,
        ratingUser: ratingUser  //added rating user
    }

    let result = await Book.find({
        bookName: bookName
    });

    let emailResult = await User.find({
        userEmail: ratingUser
    });

    if (result.length == 0) {
        res.send('Book does not exist.');
    }
    else if (emailResult.length == 0) {
        res.send('email does not exist.');
    }
    else {
        await Book.updateOne(
            {
                bookName: bookName
            },
            {
                $push: {
                    allRatings: newBookRating
                }
            });
        res.send('Successfully rated the book.');
    }
});

//View all average ratings
router.get('/averageRating', async (req, res) => {
    const avgRatingArray = [];
    const pipeline = [
        {
          '$unwind': {
            'path': '$allRatings', 
            'includeArrayIndex': 'string', 
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$group': {
            '_id': '$bookName', 
            'averageRating': {
              '$avg': '$allRatings.rating'
            }
          }
        }
      ];
    
      const aggCursor = Book.aggregate(pipeline);
      (await aggCursor).forEach(book => {
          avgRatingArray.push(`${book._id}: ${book.averageRating}`);    
      });

      res.send(avgRatingArray);
});

//Sort By Rating
router.get('/view/sortByRating/:name', async (req, res) => {
    const book = req.params.name;
    const ratingSorted = [];
    const pipeline = [
        {
          '$unwind': {
            'path': '$allRatings', 
            'includeArrayIndex': 'string', 
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$match': {
            'bookName': book
          }
        }, {
          '$sort': {
            'allRatings.rating': -1
          }
        }
      ];

    const aggCursor = Book.aggregate(pipeline);
    (await aggCursor).forEach(book => {
        ratingSorted.push(`${book.bookName}: Rating:${book.allRatings.rating}, ${book.allRatings.comment}, By: ${book.allRatings.ratingUser}`);    
    });

    res.send(ratingSorted);
});

module.exports = router;
