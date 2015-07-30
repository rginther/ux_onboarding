describe('My Suite', function(){
  var $scope, httpBackend, service, handler;
  beforeEach(module('sampleAppservices'));

  beforeEach(inject(function(_$httpBackend_, UsersService) {
    $httpBackend = _$httpBackend_;
    service = UsersService;
  }));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    handler = $httpBackend.when('GET', 'http://localhost:24149/users/5594638d82c1ab8751cb1da0')
                .respond([ {Name: 'River'}, {Name: 'Josh'} ]);
  }));

  describe('Testing', function(){

    it('should GET data by id', function() {
      var result = {};

      $httpBackend.expectGET('http://localhost:24149/users/5594638d82c1ab8751cb1da0');

      service.query({id: '5594638d82c1ab8751cb1da0'}).$promise.then(function(result_) {
        result = result_;
      });

      $httpBackend.flush();

      expect(result[0].Name).toEqual('River');
    });

    it('should POST data to the server', function() {
      $httpBackend.when('POST', 'http://localhost:24149/users').respond();

      $httpBackend.expectPOST('http://localhost:24149/users');

      service.add({}, {
        'firstName': 'First',
        'lastName': 'Last',
        'phone': 'Phone',
        'email': 'Email'
      });

      $httpBackend.flush();
    });

    it('should PUT the data', function() {
      $httpBackend.when('PUT', 'http://localhost:24149/users')
        .respond();

      $httpBackend.expectPUT('http://localhost:24149/users');

      service.save({ id: '5594638d82c1ab8751cb1da0' });

      $httpBackend.flush();
    });

    it('should DELETE the data', function() {
      $httpBackend.when('DELETE', 'http://localhost:24149/users/5594638d82c1ab8751cb1da0')
        .respond();

      $httpBackend.expectDELETE('http://localhost:24149/users/5594638d82c1ab8751cb1da0');

      service.remove({ id: '5594638d82c1ab8751cb1da0' });

      $httpBackend.flush();
    });
  });
});