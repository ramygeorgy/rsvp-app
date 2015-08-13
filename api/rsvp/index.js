var express = require('express');

var rsvpRouter = express.Router();

rsvpRouter.route('/someslug')
	.get(function(req, res) {
		var resJson = {hello: "This should pull up rsvp record based on slug in url"};
		
		res.json(resJson);
	});

module.exports = rsvpRouter;
