'use strict';

var app = angular.module('issueTracker', ['kinvey','ngRoute', 'ngResource', 'ngStorage','ui.bootstrap']);

app.constant({
    pageSize: 20
});


app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
      })
      .when('/login', {
        templateUrl: 'views/user/login.html',
        controller: 'AuthenticationController'
      })
      .when('/register', {
        templateUrl: 'views/user/register.html',
        controller: 'AuthenticationController'
      })
      .when('/users', {
          templateUrl: 'views/user/user.html',
          controller: 'UserController'
      })
      .when('/projects', {
          templateUrl: 'views/admin/all-projects.html',
          controller: 'ProjectController'
      })
      .when('/projects/add', {
          templateUrl: 'views/project/Add-new-project.html',
          controller: 'ProjectController'
      })
      .when('/project/:id', {
        templateUrl: 'views/project/project.html',
        controller: 'ViewProjectController'
      })
      .when('/project/:id/edit', {
          templateUrl: 'views/project/edit-project.html',
          controller: 'EditProjectController'
      })
      .when('/project/:id/add-issue', {
          templateUrl: 'views/project/add-project-issue.html',
          controller: 'IssueController'
      })
      .when('/projects/add-issue', {
          templateUrl: 'views/issue/add-new-issue.html',
          controller: 'IssueController'
      })
      .when('/project/:id/issue', {
          templateUrl: 'views/issue/add-project-issue.html',
          controller: 'IssueController'
      })

      .when('/profile/password', {
        templateUrl: 'views/user/change-password.html',
        controller: 'AuthenticationController'
      })
      .when('/issues/:id', {
        templateUrl: 'views/issue/issue.html',
        controller: 'ViewIssueController'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

var initialized = false;
app.run(function ($rootScope, $location, $kinvey, authenticationService) {
  $rootScope.$on('$locationChangeStart', function (event) {

      if (initialized === false) {
          // Initialize Kinvey
          console.log($kinvey)
          $kinvey.initialize({
              appKey: 'kid_H1Dm0e-Sl',
              appSecret: '11e0053531164fe59f5e95edadbe23a4'
          }).then(function() {
              initialized = true;
              $location.path($location.url('/login').hash); // Go to the page
          }).catch(function(error) {
              console.log(error)
          });
      }
      $kinvey.ping()
      .then(function(response) {
          console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
      }).catch(function(error) {
          console.log('Kinvey Ping Failed. Response: ' + error.description);
      });

    var isRegisterPage = $location.path().indexOf('/register') == -1,
        isLoginPage = $location.path().indexOf('/login') == -1,
        isHomePage = $location.path().indexOf('/') > -1 && $location.path().length == 1,
        isLoggedIn = authenticationService.isLoggedIn();

    if (!isLoggedIn && (!isHomePage && isRegisterPage && isLoginPage)) {
      $location.path("/");
    } else if (isLoggedIn && (!isRegisterPage || !isLoginPage)) {
      $location.path("/");
    }
  });
});
