const express = require ('express');
const router = express.Router();
User = require('../schemas/userSchema');

router.get('/create', (req,res) => res.send('Create User'));

router.get('/get', (req,res) => res.send('Retrieve User'));

router.get('/update', (req,res) => res.send('Update User'));

router.get('/addCC', (req,res) => res.send('Add User Credit Card'));

module.exports = router;