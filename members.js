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
  	if (err) { 
      console.log(res);
      res.status(600).end();
      return next(err)
    };
  		res.send(memberschema);
  });    
  
});

// signup complete
router.post('/signup/complete', function(req, res, next) {

  console.log('api hit for signup complete');
  console.log(req.query);

  var memberschema = new signupschema({
    _id : req.query._id,
    bio : req.query.bio,
    isNerd : req.query.isNerd,
    phone : req.query.phone,
    weblink : req.query.weblink,
    branch : req.query.branch,
    year : req.query.year,
    home : req.query.home,
    work : req.query.work,
    designation : req.query.designation,
    company : req.query.company
    },{
     versionKey: false // You should be aware of the outcome after set to false
  });

  var id = req.query._id;

  signupschema.findByIdAndUpdate(id, memberschema, function(err, post){
    if (err) { return next(err)}
      res.status(201).json(true);
  console.log(post);
  }) ; // returns Query

  

}); // end of router



router.get('/', function(req, res, next){
  signupschema.find({},{ _id:1, name:1, year :1, isNerd:1, designation:1, work:1 },function (err, todos) {
    if (err) return next(err);

    // returning in json format
    res.json(todos);

  });
});

router.post('/login', function(req, res, next) {
  console.log(req.query);
  res.json(true);

});

module.exports = router;
