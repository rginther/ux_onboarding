//ListUsersController for sampleApp----------------------------------------------------------------------
sampleApp.controller('ListUsersController', ['$scope', 'UsersService', '$location', '$window',
  function($scope, UsersService, $location, $window) {
    $scope.users = UsersService.query();


    //remove function -----------------------------------
    $scope.remove = function(user) { 
      var index = $scope.users.indexOf(user);
      $scope.users.splice(index, 1);
      UsersService.remove({ id: user._id });
    }


    //add function -----------------------------------
    $scope.add = function() {
      $scope.prevUser = {
        'firstName': this.firstName,
        'lastName': this.lastName,
        'phone': this.phone,
        'email': this.email
      }

      UsersService.add({}, $scope.prevUser);
      createForm.reset();

      $scope.userMessage = true
    };

    $scope.orderProp = 'firstName';
  }
]);  

//UserProfileController for sampleApp ----------------------------------------------------------------------
sampleApp.controller('UserProfileController', ['$scope', '$resource', '$routeParams', 'UsersService',
  function($scope, $resource, $routeParams, UsersService) {

    //Looping through the users for the id -----------------------------------
    $scope.find = function(users) {
      for(var i = 0; i < users.length; i++) {
        if (users[i]['_id'] == $routeParams.id) {
          $scope.user = users[i];
          break;
        }
      }
    };
    UsersService.query({}, function(users) {
      $scope.find(users);
    });

    $scope.userInfo = true

    //Start of editing ---------------------------------------
    $scope.editorEnabled = false;
  
    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
      $scope.editablefirstName = $scope.user.firstName;
      $scope.editablelastName = $scope.user.lastName;
      $scope.editablephone = $scope.user.phone;
    };
    
    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.save = function() {
      $scope.user.firstName = $scope.editablefirstName;
      $scope.user.lastName = $scope.editablelastName;
      $scope.user.phone = $scope.editablephone;   

      UsersService.save({id: $scope.user._id}, $scope.user);
      $scope.disableEditor();
    }
  }
]);