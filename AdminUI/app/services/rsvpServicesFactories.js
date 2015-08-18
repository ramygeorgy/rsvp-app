angular.module('rsvpApp')

.factory('rsvpStaffFactory',function($http, $q, $location, restConfig) {
    var service = {};
    
    service.getStaff = function()
    {
        return $http.get(restConfig.baseURL + restConfig.resources.staff).success(function(data) {
            return data;
        }).then(function(response) { return response.data; }, function(error) { console.error('Staff Service:  Error retrieving staff (' + error + ')'); });
    };
    
    service.updateStaff = function(staffDetail)
    {
        var ret = false;
        console.log(staffDetail);
        if(staffDetail && staffDetail._id && staffDetail._id.length > 0)
        {
            console.log('staffid: ' + staffDetail._id);
            
            var putURL = restConfig.baseURL + restConfig.resources.staff + '/' + staffDetail._id;
            
            console.log('putURL: ' + putURL);
            
            ret = $http
                .put( putURL , {'staffDetail': staffDetail})
                .success(function(data) {
                    console.log('success data: ' + data);
                    return data;
                })
                .then(function(response) { 
                        if(response.data && response.data.ok && response.data.ok === 1)
                        {
                            return true;
                        }
                        console.log('response: ');
                        console.log(response.data);
                        return false;
                    },
                    function(error) { 
                        console.error('Staff Service:  Error retrieving staff (' + error + ')');
                        return false;
                    });
        }
        
        return ret;
    };
    
    return service;
})

.factory('rsvpContactsFactory',function($http, $q) {
    var service = {};
    
    return service;
})

.factory('rsvpEventsFactory',function($http, $q) {
    var service = {};
    
    return service;
})

.factory('rsvpInvitesFactory',function($http, $q) {
    var service = {};
    
    return service;
});