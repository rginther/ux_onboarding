'use strict'; //Using STRICT text

// sampleApp module
var sampleApp = angular.module('sampleApp', [
    'ngRoute',
    'sampleAppservices'
]);

// Config Block
sampleApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'templates/ListUsers.html',
                controller: 'ListUsersController'
            }).
            when('/users/:Id', {
                templateUrl: 'templates/UserProfile.html',
                controller: 'UserProfileController'
            }).
            when('/Create', {
                templateUrl: 'templates/CreateUser.html',
                controller: 'ListUsersController'
            }).
            otherwise({
                redirectTo: '/users'
            });

}]);

//ListUsersController for sampleApp
sampleApp.controller('ListUsersController', ['$scope', 'UsersService',
  function($scope, UsersService) {
    $scope.users = UsersService.query();

    $scope.remove = function(user) { 
      var index = $scope.users.indexOf(user);
      $scope.users.splice(index, 1);
      UsersService.remove({ id: user._id });
    }

    $scope.add = function() {
      UsersService.add({}, {
        'firstName': this.firstName,
        'lastName': this.lastName,
        'phone': this.phone,
        'email': this.email
      });
    };
  }
]);  

//UserProfileController for sampleApp
sampleApp.controller('UserProfileController', ['$scope', '$routeParams', 'UsersService',
  function($scope, $routeParams, UsersService) {

    UsersService.query({}, function(users) {
      $scope.users = users;
      
      //Start of editing
      $scope.editorEnabled = false;
    
      $scope.enableEditor = function() {
        $scope.editorEnabled = true;
        $scope.editablefirstName = $scope.users.firstName;
        $scope.editablelastName = $scope.users.lastName;
        $scope.editablephone = $scope.users.phone;
        $scope.editableemail = $scope.users.email;
      };
      
      $scope.disableEditor = function() {
        $scope.editorEnabled = false;
      };
      
      $scope.save = function() {
        $scope.users.firstName = $scope.editablefirstName;
        $scope.users.lastName = $scope.editablelastName;
        $scope.users.phone = $scope.editablephone;
        $scope.users.email = $scope.editableemail;
        $scope.disableEditor();
      };
    });
  }
]);
