var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var signupschema = require('./memberschema');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now());
  next();
});
// for partial signup routing
router.post('/signup/partial', function(req, res, next) {
  console.log('api hit for signup partial');
  console.log(req.query);

  var memberschema = new signupschema({
    name : req.query.name,
    email : req.query.email,
    password : req.query.password,
    time : Date.now()
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

  console.log('api hit for signup - request');
  console.log(req.query);
  console.log(Date.now());

  var memberschema = new signupschema({
    _id : req.query._id,
    name : req.query.name,  
    bio : req.query.bio,
    isNerd : req.query.isNerd,
    phone : req.query.phone,
    weblink : req.query.weblink,
    branch : req.query.branch,
    year : req.query.year,
    home : req.query.home,
    work : req.query.work,
    designation : req.query.designation,
    company : req.query.company,
    fblink : req.query.fblink
    },{
     versionKey: false 
  });

  var id = req.query._id;

  signupschema.findByIdAndUpdate(id, memberschema, function(err, post){
    if (err) { return next(err)}
      res.status(201).json(true);

      console.log('api hit for signup - response');
      console.log(post);
  }) ; // returns Query

  

}); // end of router


// getting the list of all the data in db
router.get('/', function(req, res, next){

  console.log("For complete data");

  signupschema.find({"work":{$ne:null}},{ _id:1, name:1, year :1, isNerd:1, designation:1, work:1 },function (err, todos) {
    
    if (err) return next(err);

    // returning in json format
    res.json(todos);

  });
});

// getting the list in back of 15 people
router.post('/getlist', function(req, res, next){

  console.log("For data in a packet");

  var reqTime = req.query.time;
  var m =  new Date(reqTime);

  signupschema.find({"work":{$ne:null},"time" : { $gt: reqTime}},{ _id:1, name:1, year :1, isNerd:1, designation:1, work:1, time:1 },function (err, todos) {
  if (err) return next(err);


    // returning in json format
    

    if (todos[todos.length-1] != undefined) {

      var lastRecordTime = todos[todos.length-1].time;

    }
    else{
      var lastRecordTime = 99;
    }

    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].time = undefined;
    }


    res.setHeader('Content-Type', 'application/json');
    res.json({list:todos,time:lastRecordTime});


}).limit(15);
});

// login router
router.post('/login', function(req, res, next) {
  console.log("For login");
  // console.log(req.query);
  
  signupschema.findOne({email:req.query.email},{_id:1, password:1, name:1, work : 1},function(err, todos){
        if (err) return next(err);

  
  console.log(todos);
  if (todos==null) {
    // case when email not found
    console.log("email not found");
    res.status(600).json("email not found").end();    
  }
  else if(todos!=null){
    if (todos.password==req.query.password) {
    //when password    matches
    todos.password = undefined;
    if (todos.work != null) {
      todos.work = undefined;
    res.json(todos).end();    
    }
    else {
     res.status(800).json(todos).end();     
    }
    }
    else {
      // when not matched
      console.log("password not matched");
      res.status(700).json("not matched").end();    
    }   
  }
  
  });
});

router.post('/profile', function(req, res, next){

  console.log("For getting complete profile");

  signupschema.findById(req.query._id, {password:0},function(err, todos){
        if (err) return next(err);

    res.send(todos);
  });
});

router.post('/remaining-data', function(req, res, next){
        console.log("fot getting remaining-data on recycler view clicked");

  signupschema.findById(req.query._id, {password:0, _id:0, name:0, year :0, isNerd:0, designation:0, work:0},function(err, todos){
        if (err) return next(err);

    res.send(todos);
  });
});

module.exports = router;
