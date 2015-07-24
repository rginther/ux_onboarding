describe('Unit testing userInfo', function() {
  var $compile,
      $rootScope;

  beforeEach(module('sampleApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {

    var element = $compile("<user-info></user-info>")($rootScope);

    $rootScope.$digest();

    expect(element.html()).toContain("First Name:", "Last Name:", "Phone:", "Email:");
    expect(element.html()).toContain("ng-binding");
  });
});