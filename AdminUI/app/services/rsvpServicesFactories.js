angular.module('rsvpApp')

.factory('rsvpStaffFactory',function($http, $q, $location, restConfig) {
    var service = {};
    
    service.getStaff = function()
    {
        return $http.get(restConfig.baseURL + restConfig.resources.staff).success(function(data) {
            return data;
        }).then(function(response) { return response.data; }, function(error) { console.error('Staff Service:  Error retrieving staff (' + error + ')'); });
    };
    
    service.saveStaff = function(staffDetail)
    {
        var ret = false;
        if(staffDetail && staffDetail._id && staffDetail._id.length > 0)
        {
            return updateStaff(staffDetail);
        }
        else 
        {
            return createStaff(staffDetail);
        }
        
        return ret;
    };
    
    service.removeStaff = function(staffId)
    {
        var ret = false;
        var deleteURL = restConfig.baseURL + restConfig.resources.staff + '/' + staffId;
        
        ret = $http.delete(deleteURL)
                .success(function(data) {
                    return data;
                })
                .then(function(response) {
                        return true;
                    },
                      function(error) {
                        console.log('delete error: ' + error);
                    });
        return ret;
    };
    
    function updateStaff(staffDetail)
    {
        var ret = false;
        var putURL = restConfig.baseURL + restConfig.resources.staff + '/' + staffDetail._id;
                        
        ret = $http
                .put( putURL , {'staffDetail': staffDetail})
                .success(function(data) {
                    return data;
                })
                .then(function(response) { 
                        if(response.data && response.data.ok && response.data.ok === 1)
                        {
                            return true;
                        }
                        return false;
                    },
                    function(error) { 
                        return false;
                    });
        return ret;
    }
    
    function createStaff(staffDetail)
    {
        var ret = false;
        var postURL = restConfig.baseURL + restConfig.resources.staff;
                        
        ret = $http
                .post( postURL , {'staffDetail': staffDetail})
                .success(function(data) {
                    return data;
                })
                .then(function(response) { 
                        return response.data;
                    },
                    function(error) { 
                        console.error('Staff Service:  Error creating staff (' + error + ')');
                        return false;
                    });
        return ret;
    }
    
    return service;
})

.factory('rsvpEventsFactory',function($http, $q, $location, restConfig) {
    var service = {};

    service.getEvents = function()
    {
        return $http.get(restConfig.baseURL + restConfig.resources.event).success(function(data) {
            return data;
        }).then(function(response) { return response.data; }, function(error) { console.error('Events Service:  Error retrieving events:'); console.error(error); });
    };
    
    service.saveEvent = function(eventDetail)
    {
        var ret = false;
        if(eventDetail && eventDetail._id && eventDetail._id.length > 0)
        {
            return updateEvent(eventDetail);
        }
        else 
        {
            return createEvent(eventDetail);
        }
        
        return ret;
    };
    
    service.removeEvent = function(eventId)
    {
        var ret = false;
        var deleteURL = restConfig.baseURL + restConfig.resources.event + '/' + eventId;
        
        ret = $http.delete(deleteURL)
                .success(function(data) {
                    return data;
                })
                .then(function(response) {
                        return true;
                    },
                      function(error) {
                        console.log('delete error: ' + error);
                    });
        return ret;
    };
    
    function updateEvent(eventDetail)
    {
        var ret = false;
        var putURL = restConfig.baseURL + restConfig.resources.event + '/' + eventDetail._id;
                        
        ret = $http
                .put( putURL , {'eventDetail': eventDetail})
                .success(function(data) {
                    return data;
                })
                .then(function(response) { 
                        if(response.data && response.data.ok && response.data.ok === 1)
                        {
                            return true;
                        }
                        return false;
                    },
                    function(error) { 
                        return false;
                    });
        return ret;
    }
    
    function createEvent(eventDetail)
    {
        var ret = false;
        var postURL = restConfig.baseURL + restConfig.resources.event;
                        
        ret = $http
                .post( postURL , {'itemDetail': eventDetail})
                .success(function(data) {
                    return data;
                })
                .then(function(response) { 
                        return response.data;
                    },
                    function(error) { 
                        console.error('Event Service:  Error creating event (' + error + ')');
                        return false;
                    });
        return ret;
    }
    
    return service;
})

.factory('rsvpContactsFactory',function($http, $q) {
    var service = {};
    
    return service;
})

.factory('rsvpInvitesFactory',function($http, $q) {
    var service = {};
    
    return service;
});