var mongoose  = require('mongoose');

var signupschemapartial = new mongoose.Schema({
  imagepath : String,
  name :  String,
  email : String,
  password : String,
  bio : String,
  phone :  String,
  weblink : String,
  branch : String,
  year : String,
  home : String,
  work : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('members',signupschemapartial);
