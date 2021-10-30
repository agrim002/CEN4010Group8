/*  cartRoute.js 

	Currently, Carts are distinguished by a arbitrary cart ID that corresponds to an index in the cart_list array. 
	Once created, Carts can then be accessed through some .ejs views or by passing a cart_id through the URL.
    - This doesn't seem very secure, look into connecting carts to users? 
*/

const express = require ('express');
const bodyParser = require('body-parser');
const router = express.Router(); 

//CartSchema = require('../schemas/cartSchema'); // Unsure if it is a good idea to store carts via a database 

// Import Cart object
var Cart = require('../schemas/cartSchema.js');
var cart_list = new Array();
	
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


/// Routes
/*	GET call for cart/.  
	Redirects to cart/home view 
    May move/merge with anothe route */
router.get('/', function (req,res) 
    {
        res.redirect('home');
    }
);


/*	GET call for cart/home.  
	Renders the cartHome view and passes the amount of current carts stored */
router.get('/home', function (req,res) 
    {
        res.render('cartHome', {cart_amount : cart_list.length});
    }
);

/*	GET call for cart/create.  
	Currently all this does is render the createCart view */
router.get('/create', 
    function (req,res) 
    {
        res.render('createCart');
    }
);
/*	POST call for cart/create.  
	Reads data in req.body for variables to create a new unique cart. 
	On creation, user is redirected to the view of the cart (/cart/:cart_id/view)
	Currently this only checks for a user_email */
router.post('/create', 
    function (req,res) 
    {
        //console.log(req.body);
		
        var user_email = req.body.user_email;
        var cart_id = create_cart(user_email);
		
		// cheap check to see if element exists in array, else send an error message
        if (cart_id != null)
        {
            res.redirect('./' + cart_id + '/view');
        }
        else
        {
            var error_message = "Error, a cart for user \"" + user_email + "\" already exists";
            res.send(error_message);
        }
    }
);

/*	GET call for cart/view.  
	Reads data in req.body for variables to access a cart. 
	If the cart exists, user is redirected to the view of the cart (/cart/:cart_id/view)
	Currently this only checks for a user_email */
router.get('/view', 
    function (req,res) 
    {
        var user_email = req.body.user_email;
        var cart_id = get_index(user_email);

		//cheap check to see if element exists in array, else send an error message 
        if (get_index != null)
        {
            res.redirect('./' + cart_id + '/view');
        }
        else
        {
            res.send("Error, a cart with ID:\'" + cart_id +"\' does not exist");   
        }
    }
);
/*	POST call for cart/view.  
	Reads data in req.body for variables to access a cart. 
	If the cart exists, user is redirected to the view of the cart (/cart/:cart_id/view)
	Currently this only checks for a user_email
    POST request may me unnecessary  */
router.post('/view', 
    function (req,res) 
    {
        console.log(req.body);

        var user_email = req.body.user_email;
        var cart_id = get_index(user_email);

		//cheap check to see if element exists in array, else send an error message 
        if (get_index != null)
        {
            res.redirect('./' + cart_id + '/view');
        }
        else
        {
            res.send("Error, a cart with ID:\'" + cart_id +"\' does not exist");   
        }
    }
);

/*	GET call for cart/:cart_id/view.  
	Renders the cartView based on the specified cart_id from the cart_list array.
    Also lists the current books in the cart */
router.get('/:cart_id/view', cart_view_get_route);
    function cart_view_get_route(req,res) 
    {
        var cart_id = req.params.cart_id;

        //cheap check to see if element exists in array 
        if (cart_list[cart_id] != null)
        { 
            var user_id = cart_list[cart_id].user_id;

            /* Async data retrieval from async view_books method
               Rendering waits on the return of cart_contents */
            cart_list[cart_id].view_books()            
            .then
            (
                function(cart_contents)
                {
                    if(req.params.json == true)
                    {
                        res.send(cart_contents);
                    }
                    else
                    {
                        res.render('cartView', {user_id : user_id, cart_id : cart_id, book_list : cart_contents});
                    }
                }
            )
            .catch
            (
                function(promise)
                {
                    console.log("Error:" + promise);
                    return promise;
                }
            );
        }
        else
        {
            res.send("Error, a cart with ID:\'" + cart_id +"\' does not exist");
        }
    }


///////////////// new HTTP calls, update comments

/*	GET call for cart/add_book.  
	Currently all this does is render the cartAddBook view */
router.get('/add_book', add_book_get_route);
router.get('/addBook', add_book_get_route);
    function add_book_get_route(req,res) 
    {
        res.render('cartAddBook');
    }
/*	POST call for cart/add_book.  
	Reads data in req.body for variables to access a cart and add a book based on user email and book ISBN. 
	If the book was successfully added, the view of the user is refreshed. 
	Ideally, this request is called from the view cart page */
router.post('/add_book', add_book_post_route);
router.post('/addBook', add_book_post_route);
    function add_book_post_route(req,res) 
    {
        var book_ISBN = req.body.bookISBN;
        var user_email = req.body.user_email;

        // calculate cart_id from user email
        var cart_id = get_index(user_email);

        // Wait for book to be added to cart before refreshing the current view
        cart_add_book(req, res, cart_id, book_ISBN)
        .then
        (
            function(book_added_success)
            {
                if (book_added_success)
                {
                    // Refresh current view
                    res.redirect(req.get('referer'));
                }
            }

        );
    }

/*	GET call for cart/remove_book.  
	Currently all this does is render the cartRemoveBook view */
router.get('/remove_book', remove_book_get_route);
router.get('/removeBook', remove_book_get_route);
    function remove_book_get_route(req,res) 
    {
        res.render('cartRemoveBook');
    }

/*	POST call for cart/remove_book.  
	Reads data in req.body for variables to access a cart and remove a book based on user email and book ISBN. 
	If the book was successfully removed, the view of the user is refreshed. 
	Ideally, this request is called from the view cart page */
router.post('/remove_book', remove_book_post_route);
router.post('removeBook', remove_book_post_route);
    function remove_book_post_route(req,res) 
    {
        var book_ISBN = req.body.bookISBN;
        var user_email = req.body.user_email;

        // Calculate cart_id from user email
        var cart_id = get_index(user_email);

        // Wait for book to be removed from cart before refreshing the current view
        cart_remove_book(req, res, cart_id, book_ISBN)
        .then
        (
            function(book_removed_success)
            {
                if (book_removed_success)
                {
                    // Refresh current view
                    res.redirect(req.get('referer'));
                }
            }
        );
    }

//old routes
//router.get('/addBook', (req,res) => res.send('Add Book to Shopping Cart'));
//router.get('/get', (req,res) => res.send('Display all items in shopping cart'));
//router.get('/removeBook', (req,res) => res.send('Remove book from shopping Cart'));

module.exports = router;



/// Functions

/* 	Create a new Cart instance and add it to Cart array (cart_list) 
	Returns the index of the new cart in the array */
function create_cart(user_id) 
{
    var cart_exists = check_existing(user_id);
    var cart_id = null;

    if(cart_exists == false)
    {
        console.log(" Creating new cart...");
        cart_list.push(new Cart(user_id));

        cart_id = cart_list.length - 1;
         
        console.log("added new cart at index [" + cart_id + "] for user \""+ user_id + "\"" );
    }
    else if(cart_exists == true)
    {
        console.log("Cart with ID of " + user_id + " already exists");
    }

    return cart_id;
}

/* 	Check if a cart for a user already exists, returns true or false 
	Could possibly merge with get_index */
function check_existing(user_id)
{
    var existing = false;

    for(index = 0; index < cart_list.length; index++)
    {
        if(cart_list[index].user_id == user_id)
        {
            existing = true;
            return existing;
        }
    }

    return existing;
} 

/*  Checks if a given cart id exists
    may not be necessary? */
function check_cart_exists(cart_id)
{
    var cart_exists = false;

    if (cart_list[cart_id] != null)
    {
        cart_exists = true;
    }

    return cart_exists;

}

/* Returns the array index of a given user_id in cart_list */
function get_index(user_id)
{
    var id_index = null;

    for(index = 0; index < cart_list.length; index++)
    {
        if(cart_list[index].user_id == user_id)
        {
            id_index = index;
            return id_index;
        }
    }

    return id_index;
} 

/*  Returns the array index of a given book ISBN in book_list in a cart */
function get_book_index(cart_id, book_ISBN)
{
    var id_index = null;

    for(index = 0; index < cart_list[cart_id].book_list.length; index++)
    {
        if(cart_list[cart_id].book_list[index] == book_ISBN)
        {
            id_index = index;
            return id_index;
        }
    }

    return id_index;
} 


/* Add the given book ISBN to the given cart id */ 
async function cart_add_book(req, res, cart_id, book_ISBN)
{
    var book_added = false;

    //cheap check to see if element exists in array, else send an error message 
    if (check_cart_exists(cart_id) == true)
    {
        // Check if book exists
        var book_exists = await cart_list[cart_id].check_book_exists(book_ISBN);

        if(book_exists == true)
        {
            cart_list[cart_id].add_book(book_ISBN);
            book_added = true;
        
            //debug
            //console.log("success!");
            //console.log(cart_list[cart_id].view_books());
            //console.log("testing");
            //console.log(cart_list[cart_id]);
        }
        else
        {
            res.send("Error, a book with ISBN:\'" + book_ISBN +"\' does not exist");
        }
    }
    else
    {
        res.send("Error, a cart with ID:\'" + cart_id +"\' does not exist");   
    }

    return book_added;
}

/* Remove the given book ISBN from the given cart id */ 
async function cart_remove_book(req, res, cart_id, book_ISBN)
{
    var book_removed = false;

    //cheap check to see if element exists in array, else send an error message 
    if (check_cart_exists(cart_id) == true)
    {
        book_removed = cart_list[cart_id].remove_book(book_ISBN);

        if(book_removed == false)
        {
            res.send("Error, a book with ISBN:\'" + book_ISBN +"\' was not in the cart");
        }
    }
    else
    {
        res.send("Error, a cart with ID:\'" + cart_id +"\' does not exist");   
    }

    return book_removed;
}


