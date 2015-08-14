module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/invites')
	   .get(function(req, res) {
            var db = req.db;
                
            if(db && db.models && db.models.Invite)
            {
                var Invite = db.models.Invite;
                Invite.find(function(err, invites){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(invites);
                });
            }
            else {
                res.status(500).send("Database Connection Error");
            }
	   });
}