var rsvpAppControllers = angular.module('rsvpAppControllers',[]);

rsvpAppControllers.controller('homeController',['$scope',function($scope) {
    console.log('home Controller');
}])
.controller('eventsController',['$scope',function($scope) {
    console.log('events Controller');
}])
.controller('staffController',['$scope',function($scope) {
    console.log('staff Controller');
}])
.controller('clientsController',['$scope',function($scope) {
    console.log('clients Controller');
}]);