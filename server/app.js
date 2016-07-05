var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({extended:false});

app.listen(4242, 'localhost', function(req,res){
console.log('server listening on port 4242');
});
app.use(express.static('public'));
app.get('/', function(req,res){
  res.sendFile(path.resolve('public/views/index.html'));
});
var heroToDB = require('../models/addHero');
var mongoURI = "mongodb://localhost:27017/heroes";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

app.post('/postHero', function(req,res){
   console.log('hit post route with ' + req.body);
   var saveHero= new heroToDB ({
     alias: req.body.alias,
     name: req.body.fname,
     surname: req.body.surname,
     city: req.body.city,
     power: req.body.power
   });
   saveHero.save(function(err){
     if(err){
       console.log(err);
       res.sendStatus(500);
     }else{
       console.log('hero save complete');
       res.sendStatus(200);
     }
   });
 });
 app.get('/callHero', function(req,res){
    console.log('hit the get route');
      heroToDB.find()
      .then( function( data ){
        console.log(data);
        res.send( data );
      });
    });
app.delete('/deleteHero', function(req, res) {
      console.log('delete route w:', req.body);

      heroToDB.findOne({_id: req.body.id}, function(err, userResult) {
        if(err){
          console.log(err);
          res.sendStatus(500);
        }else{
          heroToDB.remove({_id: userResult._id}, function(err) {});
          res.sendStatus(200);
        }
      });
    });// e
//
// Your Hero Tracker
// The Department of Superhero Knowledge needs an app to help track super hero aliases and
// powers. You are going to build them this app with Angular and MongoDB. This app will have
// the following features. Please do not add anything. Focus on the functionality listed.
//
// Hero Entry
// This will have a form to fill out and create new heroes.
// Each hero will have the following information on their record:
//
// alias (this is their superhero name)
// first_name
// last_name
// city
// power_name
// Store these in a Collection called Heroes with Mongo.
//
// Super Power Select
// The above mentioned view will utilize a list of known super powers to populate a
// select list drop down. Each super power has just one field called: power_name
//
// Enter the following into your database of super powers:
//
// Invisibility
// Flight
// Super Speed
// Heat Vision
// Super Strength
// Accelerated Healing
// Power Blast
// Animal Affinity
// Use the power_name string field as the value in your option elements.
// This would store the string on the Hero object.
//
// Hero Listing & Removal
// This should show a list of heroes, displaying all the information from
// the entry captured in the view before. Each listing should have a button to
// delete the listing from the database.
//
// Node Server
// Your app will need a Node/Express server that can serve static files.
// It should make use of route modules and run on port 4242.
//
// Database
// If you follow the naming guidelines above for your Collection,
// there is no need to submit any information about your database.
