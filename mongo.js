var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});
module.exports = mongoose.model('Todo', TodoSchema);