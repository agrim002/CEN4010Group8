/*
CartSchema.js
I basically moved Cart.js here 
*/

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


/*
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartArray: {
        type: Array,
        required: true
    },
    cartUser:{
        type: Object,
        required: true
    }
});


const Cart = module.exports = mongoose.model('Cart', cartSchema);

module.exports.get = function (callback, limit) {
    Cart.find(callback).limit(limit);
}
*/