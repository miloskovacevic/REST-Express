var express = require('express');
var Book = require('../models/bookModel');

var bookController = require('../controllers/bookController')(Book);


var routes = function () {
    var bookRouter = express.Router();

//get all items...
    bookRouter.route('/Books')

        .post(bookController.post)
        .get(bookController.get);

    //parce middleware-a koje koristi /:userId rutu da dohvati iz baze podatak i prosledi ga u req parametar
    bookRouter.use('/Books/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if(err) res.status(500).send(err);
            else if(book)
            {
                req.book = book;
                next();
            }
            else{
                res.status(404).send('No book found!');
            }
        });
    })

    bookRouter.route('/Books/:bookId')
        .get(function (req, res) {
            var returnBook = req.book.toJSON();

            returnBook.links = {};
            returnBook.links.FilrerByThisGenre = 'http://' + req.headers.host + '/api/Books/?genre=' + returnBook.genre;

            res.json(returnBook);
        })
        .put(function(req, res){
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function (err){
                if(err)
                    res.status(500).send(err);
                else {
                    res.json(req.book);
                }
            });
        })
        .patch(function (req, res) {
            //ako kojim slucajem u req.body posaljemo i _id...
            if(req.body._id)
                delete req.body._id;
            //prolazimo kroz sve propertije koje smo update-ovali u body i njih save()
            for(var p in req.body)
            {
                req.book[p] = req.body[p];
            }
            //snimamo
            req.book.save(function (err){
                if(err)
                    res.status(500).send(err);
                else {
                    res.json(req.book);
                }
            });
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if(err) res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
return bookRouter;
};

module.exports = routes;