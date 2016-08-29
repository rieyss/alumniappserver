var mongoose  = require('mongoose');

var signupschemapartial = new mongoose.Schema({
  name :  String,
  email : String,
  password : String,
  phone :  String,
  weblink : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('members',signupschemapartial);
