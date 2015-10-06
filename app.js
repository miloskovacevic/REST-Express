var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

//get all items...
bookRouter.route('/Books')
    .get(function (req, res) {

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if(err) res.status(500).send(err);
            else
                res.json(books);
        });
    });
//get single item...
bookRouter.route('/Books/:bookId')
    .get(function (req, res) {

        Book.findById(req.params.bookId, function (err, book) {
            if(err) res.status(500).send(err);
            else
                res.json(book);
        });
    });
    
app.use('/api', bookRouter); // 'uzmi bookRouter i sve njegove rute nakaci na /api/ tako da kad zahtjevamo /api/Books/ dobijemo neke podatke...'

app.get('/', function (req, res) {
    res.send("Welcome to my API");
});


app.listen(port, function () {
    console.log("Gulp is  running app  on port : " + port);
})