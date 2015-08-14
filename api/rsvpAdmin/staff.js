module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/staff')
	   .get(function(req, res) {
            var db = req.db;
                
            if(db && db.models && db.models.Staff)
            {
                var Staff = db.models.Staff;
                Staff.find(function(err, staffs){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(staffs);
                });
            }
            else {
                res.status(500).send("Database Connection Error");
            }
	   });
}
