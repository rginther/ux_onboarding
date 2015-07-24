'use strict'; //Using STRICT text

// sampleApp module ----------------------------------------------------------------------
var sampleApp = angular.module('sampleApp', [
    'ngRoute',
    'sampleAppservices',
    'app.directives.userInfo'
]);

// Config Block ----------------------------------------------------------------------
sampleApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/users', {
                template: '<users></users>',
                controller: 'ListUsersController'
            }).
            when('/users/:id', {
                template: '<userprofile></userprofile>',
                controller: 'UserProfileController'
            }).
            when('/create', {
                template: '<createuser></createuser>',
                controller: 'ListUsersController'
            }).
            otherwise({
                redirectTo: '/users'
            });

}]);