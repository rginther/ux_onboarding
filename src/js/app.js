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
                template: "<users></users>",
                controller: 'sampleController'
            }).
            when('/users/:id', {
                template: "<userprofile editor-Enabled='editorEnabled' enable-Editor='enableEditor()' disable-Editor='disableEditor()' save='save()' user='user' user-Info='userInfo' editablefirst-Name='editablefirstName' editablelast-Name='editablelastName' editablephone='editablephone'></userprofile>",
                controller: 'sampleController'
            }).
            when('/create', {
                template: "<createuser prev-User='prevUser' user-Message='userMessage' user='user' add='add(user)'></createuser>",
                controller: 'sampleController'
            }).
            otherwise({
                redirectTo: '/users'
            });

}]);