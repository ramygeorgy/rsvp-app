var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

/* this is simple way to do routing but not adequate
for an api that will have many routes.
app.get('/', function(req, res) {
	res.send('welcome to the RSVP api!');
});
*/

var rsvpRouter = express.Router();

rsvpRouter.route('/rsvp/someslug')
	.get(function(req, res) {
		var resJson = {hello: "This should pull up rsvp record based on slug in url"};
		
		res.json(resJson);
	})

app.use('/api', rsvpRouter);

app.listen(port, function() {
	console.log('Running on port: ' + port);
});