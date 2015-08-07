sampleApp.controller('sampleController', ['$scope', 'UsersService', '$routeParams',
  function($scope, UsersService, $routeParams) {
    $scope.users = UsersService.query();
    $scope.orderProp = 'firstName';
    $scope.userInfo = true;

    $scope.remove = function(user) { 
      var index = $scope.users.indexOf(user);
      $scope.users.splice(index, 1);
      UsersService.remove({ id: user._id });
    };

    $scope.add = function(user) {
      $scope.prevUser = {
        'firstName': user.firstName,
        'lastName': user.lastName,
        'phone': user.phone,
        'email': user.email
      };

      UsersService.add({}, $scope.prevUser);
      createForm.reset();

      $scope.userMessage = true;
    };

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
    };
  }
]);