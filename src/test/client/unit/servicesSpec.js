//main describe -------------------------------------------------------------------------------------
describe('My Suite', function(){
  var $scope, httpBackend, service, handler;
  beforeEach(module('sampleAppservices'));

  //beforeEach --------------------------
  beforeEach(inject(function(_$httpBackend_, UsersService) {
    $httpBackend = _$httpBackend_;
    service = UsersService;
  }));

  //beforeEach --------------------------
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    //using $httpbackend to GET beforeEach -----
    handler = $httpBackend.when('GET', 'http://localhost:24149/users/5594638d82c1ab8751cb1da0')
                .respond([ {Name: 'River'}, {Name: 'Josh'} ]);
  }));

  //nested describe -------------------------------------------------------------------------------------
  describe('Testing', function(){

    //it -------------------------------------------
    it('should GET data by id', function() {
      var result = {};

      //expecting to GET by id -----
      $httpBackend.expectGET('http://localhost:24149/users/5594638d82c1ab8751cb1da0');

      service.query({id: '5594638d82c1ab8751cb1da0'}).$promise.then(function(result_) {
        result = result_;
      });

      $httpBackend.flush();

      expect(result[0].Name).toEqual('River');
    });

    //it -------------------------------------------
    it('should POST data to the server', function() {
      //using $httpBackend to POST -----
      $httpBackend.when('POST', 'http://localhost:24149/users').respond();

      //expecting to POST data -----
      $httpBackend.expectPOST('http://localhost:24149/users');

      service.add({}, {
        'firstName': 'First',
        'lastName': 'Last',
        'phone': 'Phone',
        'email': 'Email'
      });

      $httpBackend.flush();
    });

    //it -------------------------------------------
    it('should PUT the data', function() {
      //using $httpBackend to PUT -----
      $httpBackend.when('PUT', 'http://localhost:24149/users')
        .respond();

      //expecting to PUT data -----
      $httpBackend.expectPUT('http://localhost:24149/users');

      service.save({ id: '5594638d82c1ab8751cb1da0' });

      $httpBackend.flush();
    });

    //it -------------------------------------------
    it('should DELETE the data', function() {
      //using $httpBackend to DELETE -----
      $httpBackend.when('DELETE', 'http://localhost:24149/users/5594638d82c1ab8751cb1da0')
        .respond();

      //expecting to DELETE data -----
      $httpBackend.expectDELETE('http://localhost:24149/users/5594638d82c1ab8751cb1da0');

      service.remove({ id: '5594638d82c1ab8751cb1da0' });

      $httpBackend.flush();
    });
  });
});