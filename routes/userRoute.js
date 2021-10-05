const express = require ('express');
const router = express.Router();
User = require('../schemas/userSchema');

router.get('/create', (req,res) => res.send('Create User'));

router.get('/get/:userE', async (req, res) => {
    const userE = req.params.userE;
    const user = await User.findOne({userEmail: userE});
    res.send(user);
});

router.get('/update', (req,res) => res.send('Update User'));

router.get('/addCC', (req,res) => res.send('Add User Credit Card'));

module.exports = router;
