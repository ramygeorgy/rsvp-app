module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/events')
	   .get(function(req, res) {
            var resJson = {hello: "Events api"};
		
            res.json(resJson);
	   });
}