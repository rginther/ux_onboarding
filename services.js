'use strict';

//sampleAppservice GET method
var sampleAppservices = angular.module('sampleAppservices', ['ngResource']);

sampleAppservices.factory('UsersService', ['$resource',
  function($resource){
    return $resource('http://localhost:24149/users/:id', {}, {
      'query': {method:'GET', params: { id: '@id'}, isArray:true},
      'add': {method: 'POST',  headers: { 'Content-Type': 'application/json'}},
      'save': {method: 'PUT'},
      'remove': {method: 'DELETE'},
    });
  }]);

angular.module('app.directives.userInfo', [])
  .directive('userInfo', function() {
    return{
      restrict: 'E',
      scope: {
        user: '='
      },
      templateUrl: 'templates/directives/userInfo.html',
    };
  });