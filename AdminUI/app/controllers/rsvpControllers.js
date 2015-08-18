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
    
    $scope.viewStaffDetail = function(staffId) {
        $log.log('staff:' + staffId);
        var list = $scope.staffList;
        if(list && list.length > 0)
        {
            $scope.staffDetail = list.filter(function(staff,index) { return staff._id === staffId;})[0];
        }
    };
    
    $scope.closeStaffDetail = function() {
        $scope.staffDetail = {};
    };
    
    $scope.saveStaffDetail = function() {
        var ret = rsvpStaffFactory.updateStaff($scope.staffDetail);
        if(ret)
        {
            ret.then(function(data) {
                if(data === true)
                {
                    for(var i = 0; i < $scope.staffList; i++)
                    {
                        if($scope.staffList[i]._id === $scope.staffDetail._id)
                        {
                            $scope.staffList[i] = $scope.staffDetail;
                            $scope.staffDetail = {};
                            break;
                        }
                    }
                }
            });
        }
        else
        {
            console.log('Could not update Staff');
        }
    };
    
    (function init(){
        rsvpStaffFactory.getStaff().then(function(data) {
            $scope.staffList = data;
        });
     })();
}])

.controller('clientsController',['$scope','$log',function($scope,$log) {
}]);