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

    rsvpRouter.route('/events/:eventId/invites')
	   .get(function(req, res) {
            
            var modelId = req.params.eventId;
                
            var itemModel = getModel(req, res);
        
            if(itemModel)
            {
                itemModel.findById(modelId,'',function(err, list){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(list.invites);
                });
            }
        
	   })
        .post(function(req,res) {
            
            var modelId = req.params.eventId;
                
            var itemModel = getModel(req, res);
        
            if(itemModel)
            {
                var itemDetail = req.body.itemDetail;
                
                if(itemDetail && itemDetail.inviteeid && itemDetail.inviteeid.length > 0)
                {
                    var newInvite = itemModel.invites.create(itemDetail);
                    
                    itemModel.invites.push(newInvite);
                    
                    itemModel.save(function(err, newItem){
                    
                        if(err)
                        {
                            res.status(500).send(err);
                        }
                        else
                        {
                            res.json(newItem.invites.id(newInvite._id));
                        }
                    });
                    
                }
                else{
                    res.status(500).send("inviteeid is required");
                }
            }
        });
    
    rsvpRouter.route('/events/:eventId/invites/:inviteId')
        .get(function(req,res) {
            var model = getModel(req, res);
        
            if(model)
            {
                var modelId = req.params.eventId;
                var subModelId = req.params.inviteId;
                
                model.findById(modelId, '', function(err, models){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                    {
                        var ret = models.invites.id(subModelId);
                        if(ret) res.json(ret);
                        else res.status(500).send('{"err":"Invite Not Found"}');
                    }
                });
            }
            
        })
        .put(function(req,res) {
            var model = getModel(req, res);
        
            if(model)
            {
                var modelId = req.params.eventId;
                var modelSubId = req.params.inviteId;
                
                var modelDetail = req.body.eventDetail;
                
                if(modelId && modelId.length > 0 && modelDetail && modelDetail._id && modelDetail._id.length > 0)
                {
                    model.findOneAndUpdate(
                        { "_id": modelId, "invites._id": modelSubId },
                        { 
                            "$set": {
                                "invites.$": modelDetail
                            }
                        },
                        function(err,doc) {
                            if(err)
                            {
                                res.status(500).send(err);
                            }
                            else
                            {
                                res.json(doc);
                            }
                        }
                    );
                }
            }
        })
        .delete(function(req,res) {
            var model = getModel(req, res);
        
            if(model)
            {
                var modelId = req.params.eventId;
                var modelSubId = req.params.inviteId;
                
                if(modelId && modelId.length > 0)
                {
                    model.findById(modelId, '', function(err, models){
                    
                        if(err)
                            res.status(500).send(err);
                        else
                        {
                            var doc = models.invites.id(subModelId).remove();
                            models.save(function(err,results) {
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
                    });
                }
            }
        });
}