var express = require('express');
var app = express();
var router = require('./routes');
var jobroutes = require('./jobs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/alumni', function(err) {
    if(err)
{        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

app.use('/routes', router);
app.use('/jobs', jobroutes)

app.listen(3000, function () {
	console.log('Example app running on  3000')
});
21
