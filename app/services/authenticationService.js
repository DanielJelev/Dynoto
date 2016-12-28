'use strict';

app.factory('authenticationService',
    ['$http', '$kinvey',
    '$localStorage',

    function ($http, $kinvey, $localStorage) {

    var authenticationService = {};

    authenticationService.setCredentials = function (serverData) {
        $localStorage.currentUser = serverData;
    };

    authenticationService.clearCredentials = function () {
        $localStorage.$reset();
    };

    authenticationService.isLoggedIn = function () {
        return $localStorage.currentUser != undefined;
    };

    authenticationService.getHeaders = function () {
        return {
            Authorization: "Bearer " + $localStorage.currentUser.access_token,
            'Content-Type': 'application/json'
        };
    };


    authenticationService.login = function (userData) {
        return $kinvey.User.login({
            username: userData.Username,
            password: userData.Password
        });
    };

    authenticationService.register = function (userData) {

        return $kinvey.User.signup({
            username: userData.Username,
            password: userData.Password,
            name : userData.Username
        });
    };

    authenticationService.logout = function () {
        return $kinvey.User.logout();
    };

    authenticationService.editProfile = function (userData) {

    };

    authenticationService.changePassword = function (userData) {

    };
    authenticationService.userInfo = function (userData,access_token) {

    };
        authenticationService.isAdmin = function(){
            if(this.isLoggedIn()){
                return $localStorage.currentUser.isAdmin
            }
        };
    return authenticationService;
}]);