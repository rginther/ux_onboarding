'use strict';

//sampleAppservice Factory----------------------------------------------------------------------
var sampleAppservices = angular.module('sampleAppservices', ['ngResource']);

sampleAppservices.factory('UsersService', ['$resource',
  function($resource){
    return $resource('http://localhost:24149/users/:id', {}, {
      'query': {method:'GET', isArray: true},
      'add': {method: 'POST',  headers: { 'Content-Type': 'application/json'}},
      'save': {method: 'PUT'},
      'remove': {method: 'DELETE'},
    });
  }]);

//Directive----------------------------------------------------------------------
angular.module('app.directives.userInfo', [])
  .directive('userInfo', function() {
    return{
      restrict: 'E',
      replace: true,
      template: '<p style="font-size: 18px;"><span>First Name: {{user.firstName}}</span><span>Last Name: {{user.lastName}}</span><span>Phone: {{user.phone}}</span><span>Email: {{user.email}}</span></p>'
    };
  });