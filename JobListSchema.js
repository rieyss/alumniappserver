var mongoose = require('mongoose');

var JobListSchema = new mongoose.Schema({
  name: String,
  kahani: String,
  location: String,
  role : String,
  contactemail: String,
  contactweb: String,
  type : String,
  postedby : String,
  postedbyid : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('jobs', JobListSchema);
