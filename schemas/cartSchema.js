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