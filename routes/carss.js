/**
 * Created by rande on 11/14/2016.
 */
var express = require('express');
var router = express.Router();

//reference to the cars model
var Car = require('../models/cars');

//auth check
function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
};

//GET handler for carss
router.get('/', isLoggedIn, function (req,res,next) {

    //use cars model to run query
    Car.find(function (err, carss) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            res.render('carss', {
                title: 'Company Names',
                cars: carss,
                user: req.user
            });
        }
    });

});

/* GET /games/add - display empty Game form */
router.get('/add', isLoggedIn, function(req, res, next) {

    // load the blank game form
    res.render('add-car', {
        title: 'Add a New Car',
        user: req.user
    });
});

/* POST /games/add - process form submission */
router.post('/add', isLoggedIn, function(req, res, next) {
    // use the Game model and call the Mongoose create function
    Car.create( {
        title: req.body.title   ,
        model: req.body.model,
        engine: req.body.engine,
        year: req.body.year
    }, function(err, Car) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            res.redirect('/carss');
        }
    });
});

/* GET /games/delete/:_id - run a delete on selected game */
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
    // read the id value from the url
    var _id = req.params._id;

    // use mongoose to delete this game
    Car.remove( { _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {message: 'Delete Error'});
        }
        res.redirect('/carss');
    });
});

/* GET /games/:_id - show the edit form */
router.get('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // look up the selected Game document with this _id
    Car.findById(_id,  function(err, cars) {
        if (err) {
            console.log(err);
            res.render('error', { message: 'Could not find Car'});
        }
        else {
            // load the edit form
            res.render('edit-car', {
                title: 'Edit Car',
                model: cars,
                user: req.user
            });
        }
    });
});

/* POST /games/:_id - save form to process Game updates */
router.post('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // instantiate a new Game object & populate it from the form
    var Car = new Car( {
        _id: _id,
        title: req.body.title,
        model: req.body.model,
        engine: req.body.engine,
        year: req.body.year
    });

    // save the update using Mongoose
    Car.update( { _id: _id }, cars, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {message: 'Could not Update Car'});
        }
        else {
            res.redirect('/carss');
        }
    });
});

// make controller public
module.exports = router;
