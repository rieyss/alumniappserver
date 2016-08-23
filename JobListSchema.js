var mongoose = require('mongoose');
var JobListSchema = new mongoose.Schema({
  name: String,
  kahani: String,
  location: String,
  role : String,
  contactemail: String,
  contactweb: String
});
module.exports = mongoose.model('jobs', JobListSchema);
