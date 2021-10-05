const express = require ('express');
const User = require('../schemas/userSchema');
const router = express.Router();

router.get('/create', (req,res) => res.render('CreateUser'));

router.post('/create', (req,res) => {
    
    var userName = {
        userFirst: req.body.userFirst,
        userLast: req.body.userLast
    }
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userAddress = {
        userStreet: req.body.userStreet,
        userCity: req.body.userCity,
        userState: req.body.userState,
        userZip: req.body.userZip
    }

    const newUser = new User({
        userName,
        userEmail,
        userPassword,
        userAddress
    });
    
    newUser.save((err,newUser) => {
        if (err) return console.log(err);
        console.log(newUser);
        res.send("User was created!");
    })
}) 

router.get('/get/:username', async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({userEmail: username});
    res.send(user);
});

router.get('/update', (req,res) => res.send('Update User'));

router.get('/addCC', (req,res) => res.send('Add User Credit Card'));

module.exports = router;
