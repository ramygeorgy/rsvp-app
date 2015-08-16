angular.module('rsvpApp')

.factory('rsvpStaffFactory',function($http, $q) {
    var service = {};
    
    service.getStaff = function()
    {
        return $http.get('http://127.0.0.1:8000/api/rsvpAdmin/staff').success(function(data) {
            return data;
        }).then(function(response) { return response.data; }, function(error) { console.error('Staff Service:  Error retrieving staff (' + error + ')'); });
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