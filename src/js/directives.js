//Directive----------------------------------------------------------------------
/*angular.module('app.directives.userInfo', [])
  .directive('userInfo', function() {
    return{
      restrict: 'E',
      replace: true,
      template: '<p style="font-size: 18px;"><span>First Name: {{user.firstName}}</span><span>Last Name: {{user.lastName}}</span><span>Phone: {{user.phone}}</span><span>Email: {{user.email}}</span></p>'
    };
  });*/

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