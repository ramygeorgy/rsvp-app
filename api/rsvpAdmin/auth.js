module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/auth')
	   .get(function(req, res) {
            var db = req.db;
                
            if(db && db.models && db.models.Staff)
            {
                var Staff = db.models.Staff;
                
            }
            else {
                res.status(500).send("Database Connection Error");
            }
	   });
}