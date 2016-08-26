var mongoose  = require('mongoose');

var signupschema = new mongoose.Schema({
  name :  String,
  email : String,
  password : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('members',signupschema);
