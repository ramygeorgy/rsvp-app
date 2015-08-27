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
    
    rsvpRouter.route('/events/:eventId')
        .get(function(req,res) {
            var model = getModel(req, res);
        
            if(model)
            {
                var modelId = req.params.eventId;
                
                model.findById(modelId, '', function(err, models){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(models);
                });
            }
            
        })
        .put(function(req,res) {
            var model = getModel(req, res);
        
            if(model)
            {
                var modelId = req.params.eventId;
                var modelDetail = req.body.eventDetail;
                
                if(modelId && modelId.length > 0 && modelDetail && modelDetail._id && modelDetail._id.length > 0)
                {
                    var modelId = modelDetail._id;
                    delete modelDetail._id;
                    console.log(modelDetail);
                    model.update({_id: modelId}, modelDetail, function(err, results){
                    
                        if(err)
                        {
                            res.status(500).send(err);
                        }
                        else
                        {
                            res.json(results);
                        }
                    });
                }
            }
        })
        .delete(function(req,res) {
            var model = getModel(req, res);
        
            if(model)
            {
                var modelId = req.params.eventId;
                if(modelId && modelId.length > 0)
                {
                    model.remove({_id: modelId}, function(err,results){
                        if(err)
                        {
                            res.status(500).send(err);
                        }
                        else
                        {
                            res.json(results);
                        }
                    });
                }
            }
        });
}