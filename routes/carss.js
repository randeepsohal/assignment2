/**
 * Created by rande on 11/14/2016.
 */
var express = require('express');
var router = express.Router();

//reference to the cars model
var Cars = require('../models/cars');

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
    Cars.find(function (err, carss) {
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

router.get('/add', isLoggedIn, function(req, res, next) {

    // load the blank car form
    res.render('add-car', {
        title: 'Add a New Car',
        user: req.user
    });
});

/* POST /carss/add - process form submission */
router.post('/add', isLoggedIn, function(req, res, next) {
    Cars.create( {
        title: req.body.title,
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

/* GET /carss/delete/:_id*/
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
    // read the id value from the url
    var _id = req.params._id;

    Cars.remove( { _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {message: 'Delete Error'});
        }
        res.redirect('/carss');
    });
});

/* GET /carss/:_id - show the edit form */
router.get('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // look up the selected Cars document with this _id
    Cars.findById(_id,  function(err, cars) {
        if (err) {
            console.log(err);
            res.render('error', { message: 'Could not find Car'});
        }
        else {
            // load the edit form
            res.render('edit-car', {
                title: 'Edit Car',
                cars: cars,
                user: req.user
            });
        }
    });
});

/* POST /carss/:_id - save form to process car updates */
router.post('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // instantiate a new cars object & populate it from the form
    var cars = new Cars( {
        _id: _id,
        title: req.body.title,
        model: req.body.model,
        engine: req.body.engine,
        year: req.body.year
    });

    // save the update using Mongoose
    Cars.update( { _id: _id }, cars, function(err) {
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
