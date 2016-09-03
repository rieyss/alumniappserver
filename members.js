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
  });    
  
});

// signup complete
router.post('/signup/complete', function(req, res, next) {
  // console.log("Plain Query");
  // console.log(req.query);


  var memberschema = new signupschema({
    _id : req.query._id,
    bio : req.query.bio,
    phone : req.query.phone,
    weblink : req.query.weblink,
    branch : req.query.branch,
    year : req.query.year,
    home : req.query.home,
    work : req.query.work
    },{
     versionKey: false // You should be aware of the outcome after set to false
  });

  var id = req.query._id;

  signupschema.findByIdAndUpdate(id, memberschema, function(err, post){
    if (err) { return next(err)}
      res.status(201).json(true);
  }) ; // returns Query

  console.log(req.query)

}); // end of router



module.exports = router;
