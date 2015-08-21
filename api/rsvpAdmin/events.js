module.exports = function(rsvpRouter)
{
    function getModel(req, res)
    {
        var ret;
        var db = req.db;

        if(db && db.models && db.models.Event)
        {
            ret = db.models.Event;
        }
        else {
            res.status(500).send("Database Connection Error");
        }
        
        return ret;
    }

    rsvpRouter.route('/events')
	   .get(function(req, res) {
            var itemModel = getModel(req, res);
        
            if(itemModel)
            {
                itemModel.find({},function(err, list){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(list);
                });
            }
        
	   })
        .post(function(req,res) {
            var itemModel = getModel(req, res);
        
            if(itemModel)
            {
                var itemDetail = req.body.itemDetail;
                
                if(itemDetail && itemDetail.name && itemDetail.name.length > 0)
                {
                    itemModel.create(itemDetail, function(err, newItem){
                    
                        if(err)
                        {
                            res.status(500).send(err);
                        }
                        else
                        {
                            res.json(newItem);
                        }
                    });
                }
                else{
                    res.status(500).send("Name is required");
                }
            }
        });
}