module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/events')
	   .get(function(req, res) {
            var db = req.db;
                
            if(db && db.models && db.models.Event)
            {
                var Event = db.models.Event;
                Event.find(function(err, events){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(events);
                });
            }
            else {
                res.status(500).send("Database Connection Error");
            }
	   });
}