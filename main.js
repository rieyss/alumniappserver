var express = require('express');
var app = express();
var mongoose = require('mongoose');

// files	
var router = require('./routes');
var jobroutes = require('./jobs');
var memberroutes = require('./members');
var upload = require('./dpp');


mongoose.Promise = global.Promise;

// db connection
mongoose.connect('mongodb://localhost/alumni', function(err) {
    if(err)
{        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

app.use('/routes', router);
app.use('/jobs', jobroutes);
app.use('/members', memberroutes);

app.use('/upload',upload)

app.listen(3000, function () {
	console.log('Example app running on  3000')
});
