const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

// Initialise the app
const app = express();

const PORT = 3000;
const cors = require('cors');

//URI stored to connect to DB
const db = require('./databaseAccess').MongoURI;
app.use(bodyParser.urlencoded({extended:false}));

//maybe add the variable to import routes
const bookRoute = require('./routes/bookRoute');

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// routes import
app.use('/', require('./routes/welcomeRoute'));
app.use('/book', require('./routes/bookRoute'));
app.use('/author', require('./routes/authorRoute'));
app.use('/user', require('./routes/userRoute'));
app.use('/rating', require('./routes/ratingRoute'));
app.use('/cart', require('./routes/cartRoute'));
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// middleware
app.use(cors());

//bodyparser
app.use(express.urlencoded({extended:true}));

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/author',require('./routes/authorRoute.js'));

// app listener
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
