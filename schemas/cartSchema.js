/*
CartSchema.js
I basically moved Cart.js here 
*/

// Import book object for integration 
var mongoose_book = require('../schemas/bookSchema');

// Main Cart Object 
function Cart_Object(user_id)
{
    this.user_id = user_id;
    this.book_list = new Array();
}


// test function
Cart_Object.prototype.test = async function()
{
    //var ISBN = '1234';
    //console.log(mongoose_book.find()); 
    var test_book = await mongoose_book.findOne({bookISBN: ISBN});
    console.log(test_book);

    return this.user_id;
};


// Get data from a book in mongodb using its ISBN value
Cart_Object.prototype.get_book = async function(book_isbn)
{
    var book_data = await mongoose_book.findOne({bookISBN: book_isbn});

    console.log("["+ book_isbn +"] Found book \"" + book_data.bookName +"\"");

    return book_data;
};

// Add book ISBN value to array
Cart_Object.prototype.add_book = function(book_ISBN)
{
    this.book_list.push(book_ISBN);
};

// Check if the given ISBN value coresponds to an existing book in the database
Cart_Object.prototype.check_book_exists = async function(book_isbn)
{
    var book_exists = false;

    var book_data = await mongoose_book.findOne({bookISBN: book_isbn});

    if(book_data != null)
    {
        book_exists = true;
    }
    else
    {
        book_exists = false;
    }

    console.log("Valid ISBN "+ book_isbn +": "+ book_exists);

    return book_exists;
};

/*  Returns the array index of a given book ISBN in book_list in a cart */
Cart_Object.prototype.get_book_index = function(book_ISBN)
{
    var id_index = null;

    for(index = 0; index < this.book_list.length; index++)
    {
        if(this.book_list[index] == book_ISBN)
        {
            id_index = index;
            return id_index;
        }
    }

    return id_index;
} 

/*  Removes a book from book_list array based on given ISBN value */
Cart_Object.prototype.remove_book = function(book_ISBN)
{
    var book_removed = false;
    var book_index = this.get_book_index(book_ISBN);

    if(book_index != null)
    {
        this.book_list.splice(book_index, 1);
        book_removed = true;

        //debug
        console.log("Removed book with ISBN " +  book_ISBN);
    }

    return book_removed;
} 

/* Generate a detailed list of books based on the ISBN values in the book_list array and the coresponding data in mongodb */
Cart_Object.prototype.view_books = async function()
{
    var book_list_detailed = new Array();

    // Loop through book list array and get book data for each ISBN
    for(index = 0; index < this.book_list.length; index++ )
    {
        book_list_detailed.push(await this.get_book(this.book_list[index]));
    }

    //console.log(book_list_detailed);

    return book_list_detailed;
};


// Export Object
module.exports = Cart_Object;

