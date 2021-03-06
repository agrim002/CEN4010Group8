const express = require ('express');
const User = require('../schemas/userSchema');
const Book = require('../schemas/bookSchema');
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
    var userCC = {};
    var userCart = [];
    var userWishlist = [];
    const newUser = new User({
        userName,
        userEmail,
        userPassword,
        userAddress,
        userCC,
        userCart,
        userWishlist
    });

    newUser.save((err,newUser) => {
        if (err) return console.log(err);
        console.log(newUser);
        res.send("User was created!");
    });
});

 
router.get('/get/:username', async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({userEmail: username});
    
    res.send(user);
});
/*
router.get('/addCC/', (req,res) => res.render('createCC'));
router.post('/addCC', async (req, res) => {
    const userEmail = req.body.userEmail;

    var newUserCC = {
        userCCNumber: req.body.userCCNumber,
        userCCExpMonth: req.body.userCCExpMonth,
        userCCExpYear: req.body.userCCExpYear,
        userCCSecurity: req.body.userCCSecurity
    }

    User.findOneAndUpdate({userEmail: userEmail}, {$push:{userCC: newUserCC}},{upsert: true} ,function(err, res){
        if(err){
            throw err;
        }
        else{
            console.log(userEmail + " updated")
        }
    });
});*/

router.get('/addCC/', (req,res) => res.render('createCC'));
router.post('/addCC', async (req, res) => {
    const userEmail = req.body.userEmail;

    var newUserCC = {
        userCCNumber: req.body.userCCNumber,
        userCCExpMonth: req.body.userCCExpMonth,
        userCCExpYear: req.body.userCCExpYear,
        userCCSecurity: req.body.userCCSecurity
    }

    let result = await User.find({
        userEmail: userEmail
    });
    //console.log(result);

    if (result.length == 0) {
        res.send('User does not exist.');
    }
    else {
        await User.updateOne(
            {
                userEmail: userEmail
            },
            {
                $push: {
                    userCC: newUserCC
                }
            });
        res.send('Successfully added credit card');
    }
});

router.get('/update', (req,res) => res.render('UpdateUser'));
router.post('/update', async (req,res) =>{
    var userEmail = req.body.userEmail;
    
    const user = await User.findOne({userEmail: userEmail});
    const userDetails = JSON.parse(JSON.stringify(user));
   
    if ((req.body.userFirst) === ''){
        var userFirst = userDetails.userName.userFirst;
    } else {var userFirst = req.body.userFirst};
    if ((req.body.userLast) === ''){
        var userLast = userDetails.userName.userLast;
    } else {var userLast = req.body.userLast};
    if ((req.body.userPassword) === ''){
        var userPassword = userDetails.userPassword;
    } else {var userPassword = req.body.userPassword};
    if ((req.body.userStreet) === ''){
        var userStreet = userDetails.userAddress.userStreet;
    } else {var userStreet = req.body.userStreet};
    if ((req.body.userCity) === ''){
        var userCity = userDetails.userAddress.userCity;
    } else {var userCity = req.body.userCity};
    if ((req.body.userState) === ''){
        var userState = userDetails.userAddress.userState;
    } else {var userState = req.body.userState};
    if ((req.body.userZip) === ''){
        var userZip = userDetails.userAddress.userZip;
    } else {var userZip = req.body.userZip};
    
    var newUserName = {
        userFirst: userFirst,
        userLast: userLast
    };
    var newUserPassword = userPassword;
    var newUserAddress = {
        userStreet: userStreet,
        userCity: userCity,
        userState: userState,
        userZip: userZip
    };  

    User.updateOne({userEmail: userEmail}, 
        {$set:{
            userName: newUserName,
            userPassword: newUserPassword,
            userAddress: newUserAddress
        }},
        {upsert: true} ,

        //router.get('/user/create', (req,res) => res.send('User Updated'))
        function(err, res){
            if (err) return console.log(err);
            console.log(userEmail + " updated");     
        }
    );
res.send("User Updated");
});

/*router.get('/addToCart', (req,res) => res.render('addToCart'));
router.post('/addToCart', async (req,res) => {  
    const email = req.body.email;
    const bookName = req.body.bookName;


    let bookResult = await Book.find({
        bookName: bookName
    });

    let emailResult = await User.find({
        userEmail: email
    });

    if (bookResult.length == 0) {
        res.send('Book does not exist.');
    }
    else if (emailResult.length == 0) {
        res.send('email does not exist.');
    }
    else {
        await User.updateOne(
            {
                userEmail: email
            },
            {
                $push: {
                    userShoppingCart: bookName
                }
            });
        res.send('Successfully added book to cart.');
    }
});

/*router.get('/viewCart', (req,res) => res.render('viewCart'));
router.post('/viewCart', async (req,res) => {  
    const email = req.body.email;

    let emailResult = await User.find({
        userEmail: email
    });

    if (emailResult.length == 0) {
        res.send('email does not exist.');
    }
    else {
        const cart = [];
        const pipeline = [
            {
              '$unwind': {
                'path': '$userShoppingCart', 
                'includeArrayIndex': 'string', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$match': {
                'userEmail': email
              }
            }, {
              '$group': {
                '_id': '$userShoppingCart'
              }
            }
        ];
        
        const aggCursor = User.aggregate(pipeline);
        (await aggCursor).forEach(user => {
            cart.push(`${user._id}`);    
        });

        res.send(cart);
    }
});*/

router.get('/addToWishlist', (req,res) => res.render('addToWishlist'));
router.post('/addToWishlist', async (req,res) => {  
    const email = req.body.email;
    const bookName = req.body.bookName;


    let bookResult = await Book.find({
        bookName: bookName
    });

    let emailResult = await User.find({
        userEmail: email
    });

    if (bookResult.length == 0) {
        res.send('Book does not exist.');
    }
    else if (emailResult.length == 0) {
        res.send('email does not exist.');
    }
    else {
        await User.updateOne(
            {
                userEmail: email
            },
            {
                $push: {
                    userWishlist: bookName
                }
            });
        res.send('Successfully added book to wish list.');
    }
});

router.get('/viewWishlist', (req,res) => res.render('viewWishlist'));
router.post('/viewWishlist', async (req,res) => {  
    const email = req.body.email;

    let emailResult = await User.find({
        userEmail: email
    });

    if (emailResult.length == 0) {
        res.send('email does not exist.');
    }
    else {
        const wishlist = [];
        const pipeline = [
            {
              '$unwind': {
                'path': '$userWishlist', 
                'includeArrayIndex': 'string', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$match': {
                'userEmail': email
              }
            }, {
              '$group': {
                '_id': '$userWishlist'
              }
            }
        ];
        
        const aggCursor = User.aggregate(pipeline);
        (await aggCursor).forEach(user => {
            wishlist.push(`${user._id}`);    
        });

        res.send(wishlist);
    }
});

module.exports = router;
