var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

/* this is simple way to do routing but not adequate
for an api that will have many routes.
app.get('/', function(req, res) {
	res.send('welcome to the RSVP api!');
});
*/

var rsvpRouter = require('./rsvp/');
var rsvpAdminRouter = require('./rsvpAdmin/');

app.use('/api/rsvp', rsvpRouter);
app.use('/api/rsvpAdmin', rsvpAdminRouter);

app.listen(port, function() {
	console.log('Running on port: ' + port);
});