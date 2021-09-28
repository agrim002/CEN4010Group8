const express = require ('express');
const router = express.Router();
Cart = require('../schemas/cartSchema');

router.get('/create', (req,res) => res.send('Create Empty Shopping Cart'));

router.get('/addBook', (req,res) => res.send('Add Book to Shopping Cart'));

router.get('/get', (req,res) => res.send('Display all items in shopping cart'));

router.get('/removeBook', (req,res) => res.send('Remove book from shopping Cart'));

module.exports = router;