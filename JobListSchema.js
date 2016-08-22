var mongoose = require('mongoose');
var JobListSchema = new mongoose.Schema({
  name: String,
  kahani: String,
  email: String,
  web: String
});
module.exports = mongoose.model('jobs', JobListSchema);
