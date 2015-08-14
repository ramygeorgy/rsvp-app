var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var rsvpConfig = {
    dbServer: 'localhost',
    dbName: 'rsvpDB'
};

var rsvpDBConnection = require('./db')(rsvpConfig);
app.use(function(req,res,next) {
    req.db = rsvpDBConnection;
    next();
});


var rsvpRouter = require('./rsvp/');
var rsvpAdminRouter = require('./rsvpAdmin/');

app.use('/api/rsvp', rsvpRouter);
app.use('/api/rsvpAdmin', rsvpAdminRouter);

app.listen(port, function() {
	console.log('Running on port: ' + port);
});