var express = require('express');
var app = express();
var router = require('./routes');
var jobs = require('./jobs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', function(err) {
    if(err) 
{        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

app.use('/routes', router);
app.use('/jobs', jobs)

app.listen(3000, function () {
	console.log('Example app running on  3000')
});  