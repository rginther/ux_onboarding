exports.signup_request = function() {
	angular.module('userManagementMock', ['sampleApp', 'ngMockE2E'])
		.run(function ($httpBackend) {
			$httpBackend.whenGET('http://localhost:24149/users').respond(function(){
				return [200];
			});

			$httpBackend.whenPOST('http://localhost:24149/users').respond(function(){
				return [200];
			});

			$httpBackend.whenPUT('http://localhost:24149/users/:id').respond(function(){
				alert('mock put');
				return [200];
			});

			$httpBackend.whenDELETE('http://localhost:24149/users/:id').respond(function(){
				alert('mock delete');
				return [200];
			});

			$httpBackend.whenGET(/.*/).passThrough();
		
		});
}