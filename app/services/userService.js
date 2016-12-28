'use strict';

app.factory('userService',[
    '$http',
    'authenticationService',
    function ($http,authenticationService) {
        var userService = {};
    userService.getAllUsers = function(){

    };

    userService.makeAdmin= function (data) {

    };
        userService.getUserById= function (id) {

        };
        return userService;
}]);