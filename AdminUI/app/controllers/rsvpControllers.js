angular.module('rsvpApp')

.controller('rsvpMainController',['$scope','$log','rsvpAuthenticationService',function($scope, $log, AuthService) {
    $scope.isLoggedIn = function() { return AuthService.isAuthenticated(); };
    $scope.login = function() {
        $scope.$emit('RSVPLogin');
    };
    $scope.logout = function() {
        $scope.$emit('RSVPLogout');
    };
}])

.controller('rsvpAuthenticationController', ['$scope','$location','$log','rsvpAuthenticationService',function( $scope, $location, $log, AuthService) {
    $scope.isLoggedIn = function() { return AuthService.isAuthenticated(); };
    
    $scope.authenticateUser = function(pLoginInfo) {
        
        var isAuthenticated = AuthService.AuthenticateLogin(pLoginInfo);
        
        if(isAuthenticated)
        {
            $location.path("/");
        }
    };
    
}])
                                                    
.controller('homeController',['$scope','$log',function($scope,$log) {
}])

.controller('eventsController',['$scope','$log',function($scope,$log) {
}])

.controller('staffController',['$scope','$log','rsvpStaffFactory',function($scope, $log, rsvpStaffFactory) {
    $scope.staffList = [];
    $scope.staffDetail = {};
    $scope.newStaff = false;
    
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
     })();
}])

.controller('clientsController',['$scope','$log',function($scope,$log) {
}]);