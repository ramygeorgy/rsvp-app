module.exports = function(rsvpRouter)
{
    function getStaffModel(req, res)
    {
        var ret;
        var db = req.db;

        if(db && db.models && db.models.Staff)
        {
            ret = db.models.Staff;
        }
        else {
            res.status(500).send("Database Connection Error");
        }
        
        return ret;
    }
    
    rsvpRouter.route('/staff')
	   .get(function(req, res) {
            var Staff = getStaffModel(req, res);
        
            if(Staff)
            {
                Staff.find({},'firstName lastName displayName',function(err, staffs){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(staffs);
                });
            }
            
	   })
       .post(function(req,res) {
            var Staff = getStaffModel(req, res);
        
            if(Staff)
            {
                var staffDetail = req.body.staffDetail;
                
                if(staffDetail && staffDetail.lastName && staffDetail.lastName.length > 0)
                {
                    if(!staffDetail.displayName || staffDetail.displayName.length == 0) {
                        staffDetail.displayName = staffDetail.firstName + ' ' + staffDetail.lastName;
                    }
                    
                    Staff.create(staffDetail, function(err, newStaff){
                    
                        if(err)
                        {
                            res.status(500).send(err);
                        }
                        else
                        {
                            res.json(newStaff);
                        }
                    });
                }
                else{
                    res.status(500).send("Last Name is required");
                }
            }
        });
    
    rsvpRouter.route('/staff/:staffId')
        .get(function(req,res) {
            var Staff = getStaffModel(req, res);
        
            if(Staff)
            {
                var staffId = req.params.staffId;
                
                Staff.findById(staffId, 'firstName lastName displayName', function(err, staffs){
                    
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(staffs);
                });
            }
            
        })
        .put(function(req,res) {
            var Staff = getStaffModel(req, res);
        
            if(Staff)
            {
                var staffId = req.params.staffId;
                var staffDetail = req.body.staffDetail;
                
                if(staffId && staffId.length > 0 && staffDetail && staffDetail._id && staffDetail._id.length > 0)
                {
                    var staffId = staffDetail._id;
                    delete staffDetail._id;
                    
                    Staff.update({_id: staffId}, staffDetail, function(err, results){
                    
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
            var Staff = getStaffModel(req, res);
        
            if(Staff)
            {
                var staffId = req.params.staffId;
                if(staffId && staffId.length > 0)
                {
                    Staff.remove({_id: staffId}, function(err,results){
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
