module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/staff')
	   .get(function(req, res) {
            var resJson = {hello: "Staff api"};
		
            res.json(resJson);
	   });
}
