'use strict'; //Using STRICT text

// sampleApp module ----------------------------------------------------------------------
var sampleApp = angular.module('sampleApp', [
    'ngRoute',
    'sampleAppservices'
]);

// Config Block ----------------------------------------------------------------------
sampleApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/users', {
                template: "<users query='query' orderProp='orderProp' remove='remove(user)' user='user' users='users'></users>",
                controller: 'ListUsersController'
            }).
            when('/users/:id', {
                template: "<userprofile></userprofile>",
                controller: 'UserProfileController'
            }).
            when('/create', {
                template: "<createuser firstName='firstName' lastName='lastName' phone='phone' email='email' add='add()'></createuser>",
                controller: 'ListUsersController'
            }).
            otherwise({
                redirectTo: '/users'
            });

}]);