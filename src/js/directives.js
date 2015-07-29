sampleApp.directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}]);

sampleApp.directive('users', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'partials/ListUsers.html'
  };
});

sampleApp.directive('userprofile', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'partials/UserProfile.html',
    scope: {
      user: '=',
      userInfo: '=',
      enableEditor: '&',
      disableEditor: '&',
      editorEnabled: '=',
      editablefirstName: '=',
      editablelastName: '=',
      editablephone: '=',
      save: '&'
    }
  };
});

sampleApp.directive('createuser', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'partials/CreateUser.html',
    scope: {
      user: '=',
      userMessage: '=',
      prevUser: '=',
      add: '&'
    }
  };
});