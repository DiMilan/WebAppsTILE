// adunit.route.js

var mongoose = require('mongoose');
var passport = require('passport');
//var config = require('../config/database');
//require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
//var User = require("../models/user");

const express = require('express');
const app = express();
const adUnitRoutes = express.Router(); //router

// Require AdUnit model in our routes module
let Item = require('../models/Item');

// Defined store route
adUnitRoutes.route('/add').post(function (req, res) {
  let adUnit = new Item(req.body);
  adUnit.save()
    .then(game => {
    res.status(200).json({'adUnit': 'AdUnit in added successfully'});
    })
    .catch(err => {
    res.status(400).send("Could not save to database");
    });
});

// Defined get data(index or listing) route
adUnitRoutes.route('/').get(function (req, res) {
    Item.find(function (err, adUnits){
    if(err){
      console.log(err);
    }
    else {
      res.json(adUnits);
    }
  });
});

// Defined edit route
adUnitRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Item.findById(id, function (err, adUnit){
      res.json(adUnit);
  });
});

//  Defined update route
adUnitRoutes.route('/update/:id').post(function (req, res) {
    Item.findById(req.params.id, function(err, adUnit) {
    if (!adUnit)
      return next(new Error('Could not load Document'));
    else {
        adUnit.unit_name = req.body.unit_name;
        adUnit.unit_price = req.body.unit_price;

        adUnit.save().then(adUnit => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
adUnitRoutes.route('/delete/:id').get(function (req, res) {
    Item.findByIdAndRemove({_id: req.params.id}, function(err, adUnit){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

//added for signup
adUnitRoutes.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

//added for login
adUnitRoutes.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});


module.exports = adUnitRoutes;