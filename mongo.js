var mongoose = require('mongoose');
var JobListSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});
module.exports = mongoose.model('jobs', JobListSchema);