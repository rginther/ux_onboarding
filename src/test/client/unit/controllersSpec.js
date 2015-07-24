//ListUsersController describe -------------------------------------------------------------------------------------
describe('ListUsersController', function () {
  beforeEach(module('sampleApp'));

  var ctrl, scope, users, service;

  //beforeEach --------------------------
  beforeEach(inject(function(UsersService) {
    service = UsersService;
  }));

  //beforeEach --------------------------
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('ListUsersController', {
      $scope: scope
    });
  }));

  //it -------------------------------------------
  it('should remove data from the list of users', function() {

    scope.users = [ ({_id: '55956b1d82c1ab8751cb1ddd'}, {firstName: 'River'}, {lastName: 'Ginther'}, {phone: '111-111-1111'}, {email: 'example@email1.com'}), 
                    ({_id: '55956b1d82c1ab8751cb1daa'}, {firstName: 'Josh'}, {lastName: 'Edgar'}, {phone: '111-111-1111'}, {email: 'example@email2.com'}) ];

    scope.remove(scope.users[0]);

    expect(scope.users.length).toEqual(1);
  });

  //it -------------------------------------------
  it('should add a user to the list of users', function() {

    scope.users = service.add({}, {
      'firstName': 'First',
    });

    expect(scope.users.firstName).toEqual('First');
  });
});

//UserProfileController describe -------------------------------------------------------------------------------------
describe('UserProfileController', function() {
  beforeEach(module('sampleApp'));

  var ctrl, scope, users, user, service;

  //beforeEach --------------------------
  beforeEach(inject(function(UsersService) {
    service = UsersService;
  }));

  //beforeEach --------------------------
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('UserProfileController', {
      $scope: scope
    });
  }));

  //it -------------------------------------------
  it('should loop through the ids', function() {

    var users = [ ({_id: '55956b1d82c1ab8751cb1ddd'}, {firstName: 'River'}, {lastName: 'Ginther'}, {phone: '111-111-1111'}, {email: 'example@email1.com'}), 
                  ({_id: '55956b1d82c1ab8751cb1daa'}, {firstName: 'Josh'}, {lastName: 'Edgar'}, {phone: '111-111-1111'}, {email: 'example@email2.com'}) ];

    var $routeParams = {_id: '55956b1d82c1ab8751cb1ddd'}; 

    scope.find(users);

    expect(scope.user).toEqual(users[0]);
  });

  //it -------------------------------------------
  it('should enable editing', function() {
    scope.user = {
      firstName: 'River',
      lastName: 'Ginther',
      phone: '111-111-1111',
      email: 'example@email.com'
    };

    scope.enableEditor();

    expect(scope.editorEnabled).toEqual(true);
    expect(scope.editablefirstName).toEqual(scope.user.firstName);
    expect(scope.editablelastName).toEqual(scope.user.lastName);
    expect(scope.editablephone).toEqual(scope.user.phone);
  });

  //it -------------------------------------------
  it('should disable editing', function() {

    scope.disableEditor();

    expect(scope.editorEnabled).toEqual(false);
  });

  //it -------------------------------------------
  it('should save the data', function() {

    scope.user = {
      _id: '101010101011',
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    };

    scope.editablefirstName = 'River';
    scope.editablelastName = 'Ginther';
    scope.editablephone = '111-111-1111';

    scope.save();

    expect(scope.user.firstName).toEqual(scope.editablefirstName);
    expect(scope.user.lastName).toEqual(scope.editablelastName);
    expect(scope.user.phone).toEqual(scope.editablephone);
  });
});