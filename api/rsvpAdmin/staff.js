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
                
                console.log('staffId');
                console.log(staffId);
                console.log('req.body');
                console.log(req.body);
                
                if(staffId && staffId.length > 0 && staffDetail && staffDetail._id && staffDetail._id.length > 0)
                {
                    console.log(staffDetail);
                    
                    var staffId = staffDetail._id;
                    var staffDet = {
                        firstName: staffDetail.firstName,
                        lastName: staffDetail.lastName,
                        displayName: staffDetail.displayName
                    };
                    
                    console.log('id: ' + staffId);
                    console.log(staffDet);
                    
                    Staff.update({_id: staffId}, staffDet, function(err, staff){
                    
                    if(err)
                    {
                        console.log('err: ' + err);
                        res.status(500).send(err);
                    }
                    else
                    {
                        console.log('staff: ' + staff);
                        res.json(staff);
                    }
                });
                }
            }
        })
        .post(function(req,res) {
            var Staff = getStaffModel(req, res);
        
            if(Staff)
            {
            }
        });
}
