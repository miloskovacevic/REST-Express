var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var bookRoutes = require('./Routes/bookRoutes')();

app.use('/api', bookRoutes); // 'uzmi bookRouter i sve njegove rute nakaci na /api/ tako da kad zahtjevamo /api/Books/ dobijemo neke podatke...'

app.get('/', function (req, res) {
    res.send("Welcome to my API");
});


app.listen(port, function () {
    console.log("Gulp is  running app  on port : " + port);
});