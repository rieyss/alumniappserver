var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('./mongo');
/* GET /todos listing. */
router.get('/', function(req, res, next) {

  Todo.find({},{name:1, location:1 , Role:1 , type:1},function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });

});
module.exports = router;

