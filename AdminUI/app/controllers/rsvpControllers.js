angular.module('rsvpApp')

.controller('rsvpMainController',['$scope','$log','rsvpAuthenticationService',function($scope, $log, AuthService) {
    $log.log('main Controller');
    $scope.isLoggedIn = function() { return AuthService.isAuthenticated(); };
    $scope.login = function() {
        $log.log('emiting RSVPLogin event');
        $scope.$emit('RSVPLogin');
    };
    $scope.logout = function() {
        $log.log('emiting RSVPLogout event');
        $scope.$emit('RSVPLogout');
    };
}])

.controller('rsvpAuthenticationController', ['$scope','$location','$log','rsvpAuthenticationService',function( $scope, $location, $log, AuthService) {
    $log.log('authentication Controller');
    
    $scope.isLoggedIn = function() { return AuthService.isAuthenticated(); };
    
    $scope.authenticateUser = function(pLoginInfo) {
        $log.log("Authenticate User function()");
        
        var isAuthenticated = AuthService.AuthenticateLogin(pLoginInfo);
        
        if(isAuthenticated)
        {
            $location.path("/");
        }
    };
    
}])
                                                    
.controller('homeController',['$scope','$log',function($scope,$log) {
    $log.log('home Controller');
}])

.controller('eventsController',['$scope','$log',function($scope,$log) {
    $log.log('events Controller');
}])

.controller('staffController',['$scope','$log','rsvpStaffFactory',function($scope, $log, rsvpStaffFactory) {
    $log.log('staff Controller');
    $scope.staffList = [];
    (function init(){
        rsvpStaffFactory.getStaff().then(function(data) {
            $scope.staffList = data;
            console.log($scope.staffList);
        });
     })();
}])

.controller('clientsController',['$scope','$log',function($scope,$log) {
    $log.log('clients Controller');
}]);