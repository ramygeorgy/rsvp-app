angular.module('rsvpApp')

.controller('rsvpMainController',['$scope','$log','rsvpAuthenticationService',function($scope, $log, AuthService) {
    $scope.isLoggedIn = function() { return AuthService.isAuthenticated(); };
    $scope.login = function() {
        $scope.$emit('RSVPLogin');
    };
    $scope.logout = function() {
        $scope.$emit('RSVPLogout');
    };
    $scope.currentUser = function() {
        return AuthService.currentUser();
    };
}])

.controller('rsvpAuthenticationController', ['$scope','$location','$log','rsvpAuthenticationService','rsvpStaffFactory',function( $scope, $location, $log, AuthService, rsvpStaffFactory) {
    $scope.isLoggedIn = function() { return AuthService.isAuthenticated(); };
    
    $scope.authenticateUser = function(pLoginInfo) {
        
        pLoginInfo.userDetail = $scope.availableStaff.filter(function(staff,index) { return staff._id === pLoginInfo.userId;})[0];
        
        var isAuthenticated = AuthService.AuthenticateLogin(pLoginInfo);
        
        if(isAuthenticated)
        {
            $location.path("/");
        }
    };
    
    rsvpStaffFactory.getStaff().then(function(staffList) { $scope.availableStaff = staffList; }, function(error) { $log.error('rsvpAuthenticationController error: ' + error); });
    
}])
                                                    
.controller('homeController',['$scope','$log',function($scope,$log) {
}])

.controller('eventsController',['$scope','$log','rsvpEventsFactory','rsvpAuthenticationService',function($scope,$log, rsvpEventsFactory, rsvpAuthenticationService) {
    $scope.eventsList = [];
    $scope.eventDetail = {};
    $scope.newEvent = false;
    
    $scope.currentUser = {};
    
    $scope.viewEventDetail = function(eventId) {
        $log.log('event:' + eventId);
        var list = $scope.eventList;
        if(list && list.length > 0)
        {
            $scope.eventDetail = list.filter(function(event,index) { return event._id === eventId;})[0];
        }
    };
    
    $scope.createNewEventDetail = function() {
        $scope.eventDetail = {name:''};
        $scope.newEvent = true;
    };
    
    $scope.closeEventDetail = function() {
        $scope.eventDetail = {};
        $scope.newEvent = false;
    };
    
    $scope.removeEvent = function(eventId,$event) {
        $event.preventDefault();
        $event.stopPropagation();
        
        var ret = rsvpEventsFactory.removeEvent(eventId);
        if(ret)
        {
            ret.then(function(data) {
                if(data === true)
                {
                       retrieveEventsList();                    
                }
                else {
                    console.log('Unable to update events');
                }
            });
        }
        else{
            console.log('could not remove events');
        }
    };
    
    $scope.saveEventDetail = function() {
        var ret = rsvpEventsFactory.saveEvent($scope.eventDetail);
        if(ret)
        {
            ret.then(function(data) {
                if(data === true)
                {
                    for(var i = 0; i < $scope.eventsList; i++)
                    forblock: {
                        if($scope.eventsList[i]._id === $scope.eventDetail._id)
                        {
                            $scope.eventsList[i] = $scope.eventDetail;
                            break forblock;
                        }
                    }
                    $scope.closeEventDetail();
                            
                }
                else if (data._id && data._id.length > 0) {
                    $scope.eventsList.push(data);
                    $scope.closeEventDetail();
                }
                else {
                    console.log('Unable to update event');
                }
            });
        }
        else
        {
            console.log('Could not update Event');
        }
    };
    
    function retrieveEventList()
    {
        rsvpEventsFactory.getEvents().then(function(data) {
            $scope.eventsList = data;
        });
        
        
    }
    
    (function init(){
        retrieveEventList();
        
        $scope.currentUser = rsvpAuthenticationService.currentUser();
     })();
}])

.controller('staffController',['$scope','$log','rsvpStaffFactory','rsvpAuthenticationService',function($scope, $log, rsvpStaffFactory, rsvpAuthenticationService) {
    $scope.staffList = [];
    $scope.staffDetail = {};
    $scope.newStaff = false;
    
    $scope.currentUser = {};
    
    $scope.viewStaffDetail = function(staffId) {
        $log.log('staff:' + staffId);
        var list = $scope.staffList;
        if(list && list.length > 0)
        {
            $scope.staffDetail = list.filter(function(staff,index) { return staff._id === staffId;})[0];
        }
    };
    
    $scope.createNewStaffDetail = function() {
        $scope.staffDetail = {displayName:'',firstName:'',lastName:''};
        $scope.newStaff = true;
    };
    
    $scope.closeStaffDetail = function() {
        $scope.staffDetail = {};
        $scope.newStaff = false;
    };
    
    $scope.removeStaff = function(staffId,$event) {
        $event.preventDefault();
        $event.stopPropagation();
        
        var ret = rsvpStaffFactory.removeStaff(staffId);
        if(ret)
        {
            ret.then(function(data) {
                if(data === true)
                {
                       retrieveStaffList();                    
                }
                else {
                    console.log('Unable to update staff');
                }
            });
        }
        else{
            console.log('could not remove staff');
        }
    };
    
    $scope.saveStaffDetail = function() {
        var ret = rsvpStaffFactory.saveStaff($scope.staffDetail);
        if(ret)
        {
            ret.then(function(data) {
                if(data === true)
                {
                    for(var i = 0; i < $scope.staffList; i++)
                    forblock: {
                        if($scope.staffList[i]._id === $scope.staffDetail._id)
                        {
                            $scope.staffList[i] = $scope.staffDetail;
                            break forblock;
                        }
                    }
                    $scope.closeStaffDetail();
                            
                }
                else if (data._id && data._id.length > 0) {
                    $scope.staffList.push(data);
                    $scope.closeStaffDetail();
                }
                else {
                    console.log('Unable to update staff');
                }
            });
        }
        else
        {
            console.log('Could not update Staff');
        }
    };
    
    function retrieveStaffList()
    {
        rsvpStaffFactory.getStaff().then(function(data) {
            $scope.staffList = data;
        });
        
        
    }
    
    (function init(){
        retrieveStaffList();
        
        $scope.currentUser = rsvpAuthenticationService.currentUser();
     })();
}])

.controller('clientsController',['$scope','$log',function($scope,$log) {
}]);