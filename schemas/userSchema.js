const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: Object,
        required: true,
            userFirst:{
                type: String,
                required: true
            },
            userLast:{
                type: String,
                required: true
            }
    },
    userEmail: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
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
    },
    userCC: {
        type: Array,
        userCCNumber: {
            type: String,
            required: true
        },
        userCCExpMonth: {
            type: String,
            required: true
        },
        userCCExpYear: {
            type: String,
            required: true
        },
        userCCSecurity: {
            type: String,
            required: true
        }
    },
    userShoppingCart: {
        type: Array
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
