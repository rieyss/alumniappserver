var mongoose  = require('mongoose');

var signupschemapartial = new mongoose.Schema({
  imagepath : String,
  name :  String,
  email : {type: String, index: {unique: true, dropDups: true}},
  isNerd : Boolean,
  password : String,
  bio : String,
  phone :  String,
  weblink : String,
  fblink : String,
  branch : String,
  year : String,
  home : String,
  work : String,
  designation: String,
  company : String,
  time : {type:Number},
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('members',signupschemapartial);
