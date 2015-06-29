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
            when('/users/:id', {
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
      alert('User is created!');
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

      //Looping through the users for the id
      UsersService.query({}, function(users) {
        for(var i = 0; i < users.length; i++) {
          if (users[i]['_id'] == $routeParams.id) {
            $scope.user = users[i];
            break;
          }
        }
      });
      

    UsersService.query({}, function(users) {
      $scope.users = users;

      //Start of editing
      $scope.editorEnabled = false;
    
      $scope.enableEditor = function() {
        $scope.editorEnabled = true;
        $scope.editablefirstName = $scope.user.firstName;
        $scope.editablelastName = $scope.user.lastName;
        $scope.editablephone = $scope.user.phone;
        $scope.editableemail = $scope.user.email;
      };
      
      $scope.disableEditor = function() {
        $scope.editorEnabled = false;
      };
      
      $scope.update = function() {
        UsersService.user.firstName = $scope.editablefirstName;
        $scope.user.lastName = $scope.editablelastName;
        $scope.user.phone = $scope.editablephone;
        $scope.user.email = $scope.editableemail;
        $scope.disableEditor();
      };
    });
  }
]);
