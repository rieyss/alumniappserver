var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var JobList = require('./JobListSchema');

/* GET /todos listing. */
router.get('/', function(req, res, next) {

console.log('api hit for JobListSchema');
	// Query from db
  JobList.find({},{name:1, location:1 , role:1 , type:1},function (err, todos) {
    if (err) return next(err);

    // returning in json format
    res.json(todos);

  });

});

router.get('/detail/:id', function(req, res, next) {

  
console.log('api hit for jobdetails');
// console.log('request',req.params.id);
// console.log('request id',req.id);
	// Query from db
  JobList.findById(req.params.id,{_id:0, kahani:1, contactweb:1 , contactemail:1, postedby:1, postedbyid:1 },function (err, todos) {
    if (err) return next(err);

    // returning in json format
    res.json(todos);

  });

});

router.post('/post', function(req, res, next){
  
  console.log('querry',req.query);
  console.log('api hit for jobPost');

  var post = new JobList({
    name      : req.query.name,
    kahani    : req.query.kahani,
    location  : req.query.location,
    role      : req.query.role,
    contactemail: req.query.contactemail,
    contactweb: req.query.contactweb,
    postedby  : req.query.postedby,
    postedbyid: req.query.postedbyid,
    type      : req.query.type
  })
  post.save(function (err, post) {
   if (err) { return next(err) }
   res.status(201).json(true);
 })

});


module.exports = router;
