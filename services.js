'use strict';

//sampleAppservice GET method
var sampleAppservices = angular.module('sampleAppservices', ['ngResource']);

sampleAppservices.factory('UsersService', ['$resource',
  function($resource){
    return $resource('http://localhost:24149/users/:id', {}, {
      'query': {method:'GET', isArray:true},
      'add': {method: 'POST', headers: { 'Content-Type': 'application/json'}},
      'update': {method: 'PUT', headers: { 'Content-Type': 'application/json'}},
      'remove': {method: 'DELETE'},
    });
  }]);
