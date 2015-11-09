angular.module('rsvpApp')

.factory('rsvpStaffFactory',function($http, $q, $location, restConfig) {
    var service = {};
    
    service.getStaff = function()
    {
        return $http.get(restConfig.baseURL + restConfig.resources.staff).success(function(data) {
            return data;
        }).then(function(response) { return response.data; }, function(error) { console.error('Staff Service:  Error retrieving staff:');
                                                                               console.error(error); });
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

.factory('rsvpClientFactory',function($http, $q, restConfig) {
    var service = {};
    
    service.getClients = function()
    {
        return $http.get(restConfig.baseURL + restConfig.resources.client).success(function(data) {
            return data;
        }).then(function(response) { return response.data; }, function(error) { console.error('Clients Service:  Error retrieving clients:'); console.error(error); });
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
                        console.error('Client Service:  Error creating event (' + error + ')');
                        return false;
                    });
        return ret;
    }
    
    
    return service;
})

.factory('rsvpInvitesFactory',function($http, $q, restConfig) {
    var service = {};
    
    service.getInvites = function()
    {
        return $http.get(restConfig.baseURL + restConfig.resources.invite).success(function(data) {
            return data;
        }).then(function(response) { return response.data; }, function(error) { console.error('Invites Service:  Error retrieving events:'); console.error(error); });
    };
    
    service.saveInvite = function(eventInvite)
    {
        var ret = false;
        if(eventInvite && eventInvite._id && eventInvite._id.length > 0)
        {
            return updateInvite(eventInvite);
        }
        else 
        {
            return createInvite(eventInvite);
        }
        
        return ret;
    };
    
    service.removeInvite = function(eventInviteId)
    {
        var ret = false;
        var deleteURL = restConfig.baseURL + restConfig.resources.invite + '/' + eventInviteId;
        
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
    
    function updateInvite(eventInvite)
    {
        var ret = false;
        var putURL = restConfig.baseURL + restConfig.resources.invite + '/' + eventInvite._id;
                        
        ret = $http
                .put( putURL , {'eventInvite': eventInvite})
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
    
    function createInvite(eventInvite)
    {
        var ret = false;
        var postURL = restConfig.baseURL + restConfig.resources.invite;
                        
        ret = $http
                .post( postURL , {'eventInvite': eventInvite})
                .success(function(data) {
                    return data;
                })
                .then(function(response) { 
                        return response.data;
                    },
                    function(error) { 
                        console.error('Invite Service:  Error creating invite (' + error + ')');
                        return false;
                    });
        return ret;
    }
        
    return service;
});