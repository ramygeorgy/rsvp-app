angular.module('rsvpAuthentication',['ngCookies'])
.factory('rsvpAuthenticationService',['$http','$cookies','$log',function($http,$cookies,$log) {
    var service = {};
    
    service.isAuthenticated = function() {
        var authenticated = false;
        var userInfo = $cookies.getObject("RSVPUser");
        if(userInfo && userInfo.username && userInfo.username.length > 0)
        {
            authenticated = true;
        }
        return authenticated;
    };
    
    service.AuthenticateLogin = function(loginInfo) {
        var authenticated = false;
        
        $log.log("rsvpAuthenticationService.AuthenticateLogin");
        
        if(loginInfo && loginInfo.username && loginInfo.password)
        {
            authenticated = (loginInfo.username === 'test' && loginInfo.password === 'test');
            if(authenticated)
            {
                var userInfo = {};
                userInfo.username = loginInfo.username;
                userInfo.name = "Test";
                
                $cookies.putObject("RSVPUser",userInfo);
            }
        }
        return authenticated;
    };
    
    service.RemoveAuthenticatedLogin = function() {
        $cookies.remove("RSVPUser");
        $log.log('Removed Authenticated User');
    }
    
    return service;
}]);