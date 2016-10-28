var myApp = angular.module('projectAnnoucementApp', ['ngRoute', 'ngCookies']);
myApp.config(function ($routeProvider) {
    'use strict';
    var viewPath = "app/views/";
    $routeProvider.when('/home', {
        templateUrl: viewPath + "projects.html",
        controller: "projectAnnoucementCtrl",
        resolve: {
            store: function (projectStorage) {
                // Get the correct module (API or localStorage).
                return projectStorage.then(function (module) {
                    module.get(); // Fetch the todo records in the background.
                    return module;
                });
            }
        }
    }).when('/registerProjects', {
        templateUrl: viewPath + "registerProjects.html",
        controller: "projectRegistrationCtrl",
        resolve: {
            store: function (projectStorage) {
                // Get the correct module (API or localStorage).
                return projectStorage.then(function (module) {
                    module.get(); // Fetch the todo records in the background.
                    return module;
                });
            }
        }
    }).otherwise({
        redirectTo: '/home'
    });    
});

myApp.run(function ($rootScope, $cookieStore, $http, AuthenticationService) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        } else {
            AuthenticationService.SetCredentials('TestUser', 'Password123');
        }
});