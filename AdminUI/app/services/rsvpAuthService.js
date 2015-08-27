angular.module('rsvpApp')
.factory('rsvpAuthenticationService',['$http','$cookies','$log',function($http,$cookies,$log) {
    var service = {};
    
    service.isAuthenticated = function() {
        var authenticated = false;
        var userInfo = $cookies.getObject("RSVPUser");
        if(userInfo && userInfo.userId && userInfo.userId.length > 0)
        {
            authenticated = true;
        }
        return authenticated;
    };
    
    service.currentUser = function(){
        var userInfo = $cookies.getObject("RSVPUser") || {};
        var ret = userInfo.userDetail || {};
        
        return ret;
    };
    
    service.AuthenticateLogin = function(loginInfo) {
        var authenticated = false;
        
        if(loginInfo && loginInfo.userId) /* && loginInfo.password) */
        {
            authenticated = true; /*(loginInfo.username === 'test' && loginInfo.password === 'test');*/
            if(authenticated)
            {
                var userInfo = {};
                userInfo.userId = loginInfo.userId;
                userInfo.userDetail = loginInfo.userDetail;
                
                $cookies.putObject("RSVPUser",userInfo);
            }
        }
        return authenticated;
    };
    
    service.RemoveAuthenticatedLogin = function() {
        $cookies.remove("RSVPUser");
    }
    
    return service;
}]);