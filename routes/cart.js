/* 	Cart.js file
	May merge with cartRoute.js */

// Main Cart Object 
function Cart_Object(user_id)
{
    this.user_id = user_id;
    this.book_list = new Array();
}

// test function
Cart_Object.prototype.test = function()
{
    return this.user_id;
};


// Export Object
module.exports = Cart_Object;