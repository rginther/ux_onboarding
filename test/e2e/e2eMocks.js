exports.signup_request = function() {
	angular.module('userManagementMock', ['sampleApp', 'ngMockE2E'])
		.run(function ($httpBackend) {

			//Creates the 2 fake users
			var usersList = [
				{
					'_id': 'A0A0A0A0A0A0A0A0A0A0A0A0',
					firstName: 'Test1',
					lastName: 'User1',
					phone: '555-555-5555',
					email: 'test1.user1@email.com'
				},
				{
					'_id': 'B0B0B0B0B0B0B0B0B0B0B0B0',
					firstName: 'Test2',
					lastName: 'User2',
					phone: '555-555-5556',
					email: 'test2.user2@email.com'
				}
			];


			$httpBackend.whenGET('http://localhost:24149/users').respond(function(){
				//alert('mock get');
				return [200, usersList];
			});

			$httpBackend.whenPOST('http://localhost:24149/users').respond(function(){
				//alert('mock post');
				return [200, usersList[0]];
			});

			$httpBackend.whenDELETE('http://localhost:24149/users/A0A0A0A0A0A0A0A0A0A0A0A0').respond(function(){
				//alert('mock delete');
				return [200];
			});

			$httpBackend.whenPUT('http://localhost:24149/users/A0A0A0A0A0A0A0A0A0A0A0A0').respond(function(){
				//alert('mock put');
				return [200, usersList[0]];
			});

			$httpBackend.whenGET(/.*/).passThrough();
		
		});
}