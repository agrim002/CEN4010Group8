const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userAddress: {
        type: Object,
        required: true,
            userStreet:{
                type: String,
                required: true
            },
            userCity:{
                type: String,
                required: true
            },
            userState:{
                type: String,
                required: true
            },
            userZip:{
                type: String,
                required: true
            }
    }
    //create schema for CC or add in here?
});


const User = module.exports = mongoose.model('User', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}