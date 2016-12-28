app.controller('AuthenticationController',[
    '$scope',
    '$location',
    '$rootScope',
    'authenticationService',
    'notifyService',
    '$localStorage',
    '$window',
    '$kinvey',
    function ($scope, $location, $rootScope, authenticationService,notifyService, $localStorage,$window) {

        $scope.isLogged = authenticationService.isLoggedIn();

        $scope.register = function (userData) {
            authenticationService.logout().then(function(){
                authenticationService.register(userData).then(
                    function success() {
                        var userLogin = {
                            Username: userData.Email,
                            Password:userData.Password
                        };
                        authenticationService.login(userLogin).then(function (serverData) {
                            authenticationService.setCredentials(serverData);
                            notifyService.showInfo('Successful register');
                            $location.path("/");
                        })
                    },
                    function error(error) {
                        notifyService.showError("User registration failed", error);
                    }
                );
            })
        };

        $scope.login = function (userData) {
            authenticationService.logout().then(function(){
                authenticationService.login(userData).then(
                    function success(user) {
                            authenticationService.setCredentials(user);
                            notifyService.showInfo('Successful login');
                        $location.path("/");
                    },
                    function error(error) {
                        notifyService.showError("User login failed", error);
                    }
                );
            })

        };

        $scope.logout = function () {
            authenticationService.logout().then(
                function success(serverData) {
                    authenticationService.clearCredentials(serverData);
                    notifyService.showInfo('Good Bye!');
                    $location.path("/");
                },
                function error(error) {

                }
            );
        };


        $scope.changePassword = function (userData) {
            authenticationService.changePassword(userData).then(
                function success() {
                    notifyService.showInfo('Successful password changed!');
                    $location.path('/');
                },
                function error(err) {
                    notifyService.showInfo('Failed to change password'+err)
                }
            )
        }
    }]);