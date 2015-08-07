
// Declare app level module which depends on views, and components
angular.module('rsvpApp', [
  'ngRoute',
  'rsvpAppControllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html'
        })
        .when('/staff', {
            templateUrl: 'views/staff/staff.html'
        })
        .when('/events', {
            templateUrl: 'views/events/events.html'
        })
        .when('/clients', {
            templateUrl: 'views/clients/clients.html'
        })
      .otherwise({redirectTo: '/home'});
}]);