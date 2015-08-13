module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/contacts')
	   .get(function(req, res) {
            var resJson = {hello: "Contacts api"};
		
            res.json(resJson);
	   });
}