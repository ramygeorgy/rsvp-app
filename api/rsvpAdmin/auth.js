module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/auth')
	   .get(function(req, res) {
            var resJson = {hello: "Auth api"};
		
            res.json(resJson);
	   });
}