/*  cartRoute.js 

	Currently, Carts are distinguished by a arbitrary cart ID that corresponds to an index in the cart_list array. 
	Once created, Carts can then be accessed through some .ejs views or by passing a cart_id through the URL.
    - This doesn't seem very secure, look into connecting carts to users? 
*/

const express = require ('express');
const bodyParser = require('body-parser');
const router = express.Router(); 

CartSchema = require('../schemas/cartSchema'); // Unsure if it is a good idea to store carts via a database 

// Import Cart object
/*var Cart = require('./cart.js');
var cart_list = new Array();
	
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


/// Routes

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

/*	POST call for cart/view.  
	Reads data in req.body for variables to access a cart. 
	If the cart exists, user is redirected to the view of the cart (/cart/:cart_id/view)
	Currently this only checks for a user_email */
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
	Renders the cartView based on the specified cart_id from the cart_list array */
router.get('/:cart_id/view', 
    function (req,res) 
    {
        var cart_id = req.params.cart_id;

        //cheap check to see if element exists in array 
        if ((cart_id < cart_list.length ) && (cart_id >= 0))
        {
            var user_id = cart_list[cart_id].user_id;
            res.render('cartView', {user_id : user_id, cart_id : cart_id });
        }
        else
        {
            res.send("Error, a cart with ID:\'" + cart_id +"\' does not exist");
        }
    }
);

router.get('/addBook', (req,res) => res.send('Add Book to Shopping Cart'));

router.get('/get', (req,res) => res.send('Display all items in shopping cart'));

router.get('/removeBook', (req,res) => res.send('Remove book from shopping Cart'));

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
} */
