app.controller('MainController',[
    '$scope',
    '$q',
    '$localStorage',
    'authenticationService',
    'pageSize',

    function ($scope, $q,$localStorage,authenticationService, pageSize) {

        $scope.authService = authenticationService;

        if($scope.authService.isLoggedIn()){
            $scope.issueParams = {
                'startPage': 1,
                'pageSize': 3
            };
        }
}]);