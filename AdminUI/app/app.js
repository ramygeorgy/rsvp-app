
// Declare app level module which depends on views, and components
angular.module('rsvpApp', [
    'ngRoute',
    'ngCookies',
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            data: { 
                authRequired: true 
            }
        })
        .when('/staff', {
            templateUrl: 'views/staff/staff.html',
            data: { 
                authRequired: true 
            }
        })
        .when('/myaccount', {
            templateUrl: 'views/staff/myaccount.html',
            data: { 
                authRequired: true 
            }
        })
        .when('/events', {
            templateUrl: 'views/events/events.html',
            data: { 
                authRequired: true 
            }
        })
        .when('/clients', {
            templateUrl: 'views/clients/clients.html',
            data: { 
                authRequired: true 
            }
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            data: { 
                authRequired: false 
            }
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            data: { 
                authRequired: false
            }
        })
        .otherwise({redirectTo: '/home'});
}])
.run(['$rootScope', '$location', '$log', 'rsvpAuthenticationService',function($rootScope, $location, $log, AuthService) {
    $rootScope.$on('$routeChangeStart',function(event,next) {
        if(next.data)
        {
            var authRequired = next.data.authRequired;
            if(authRequired && !AuthService.isAuthenticated())
            {
                event.preventDefault();
                $location.path('/login');
            }
        }
    });
    $rootScope.$on('RSVPLogout',function(event,next) {
        AuthService.RemoveAuthenticatedLogin();
        $location.path('/logout');
    });
    $rootScope.$on('RSVPLogin',function(event,next) {
        $location.path('/login');
    });
}]);