module.exports = function(rsvpRouter)
{
    rsvpRouter.route('/contacts')
	   .get(function(req, res) {
            var db = req.db;
                
            if(db && db.models && db.models.Contact)
            {
                var Contact = db.models.Contact;
                Contact.find(function(err, contacts){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(contacts);
                });
            }
            else {
                res.status(500).send("Database Connection Error");
            }
	   });
}