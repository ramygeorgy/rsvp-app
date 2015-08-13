module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/invites')
	   .get(function(req, res) {
            var resJson = {hello: "Invites api"};
		
            res.json(resJson);
	   });
}