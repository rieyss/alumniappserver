var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var signupschema = require('./memberschema');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// for partial signup routing
router.post('/signup/partial', function(req, res, next) {
  console.log('api hit for signup partial');
  console.log(req.query);

  var memberschema = new signupschema({
    name : req.query.name,
    email : req.query.email,
    password : req.query.password
  },{
    versionKey: false // You should be aware of the outcome after set to false
});

  memberschema.save(function(err, post){
  	if (err) { return next(err)}
  		res.send(memberschema);
  })
  
});

// signup complete
router.post('/signup/complete', function(req, res, next) {
  console.log('api hit for signup complete');
  console.log(req.query);

  var id = req.query._id;

  var memberschema = new signupschema({
    name : req.query.name,
    email : req.query.email,
    password : req.query.password
  },{
    versionKey: false // You should be aware of the outcome after set to false
});

  // memberschema.save(function(err, post){
  //   if (err) { return next(err)}
      res.send("true");
  // })
  
});

module.exports = router;
