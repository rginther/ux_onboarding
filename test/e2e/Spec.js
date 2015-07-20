// spec.js

describe('ux_onboarding App', function() {
	var mockModule;
	beforeEach(function() {
	    mockModule = require('./mocks');

	    browser.addMockModule('userManagementMock', mockModule.signup_request);

	    browser.get('http://localhost:64478');
	});

	

	//This allows you to view the window being tested better by slowing it down -----
	var origFn = browser.driver.controlFlow().execute;

	browser.driver.controlFlow().execute = function() {
		var args = arguments;

		// queue 150ms wait
		origFn.call(browser.driver.controlFlow(), function() {
			return protractor.promise.delayed(0);
		});

		return origFn.apply(browser.driver.controlFlow(), args);
	};

	describe('ngRoute', function() {

		var firstName = element(by.model('firstName'));
		var lastName = element(by.model('lastName'));
		var phone = element(by.model('phone'));
		var email = element(by.model('email'));

		function add(a, b, c, d) {
			firstName.sendKeys(a);
			lastName.sendKeys(b);
			phone.sendKeys(c);
			email.sendKeys(d);

			element(by.css('.Add')).click();
			browser.switchTo().alert().accept();
		}
		//Create Tab-----------------------------------------------

		//it------------
		it('should test the Create User tab', function() {

			//Getting the div class
			element.all(by.className('nav')).first().click();

			//Clicking the Create User tab
			element.all(by.css('.Create User')).click();
			expect(browser.getCurrentUrl()).toContain('create');

			//Adding text to input fields
			add('Jake','Long', '111-111-1111', 'example@email.com');
			add('Kean','asd', '111-111-1111', 'example@email2.com');

		});
	});

	//Ending it -----

	describe('ngRoute', function() {
		var firstName = element(by.model('editablefirstName'));

		function add(a) {
			firstName.sendKeys(a);
		}

		//Users Tab-----------------------------------------------
		//it------------
		it('should test the Users tab', function() {

			//Clicking Users tab
			element.all(by.css('.Users')).click();
			expect(browser.getCurrentUrl()).toContain('users');

			//Clicking Delete button
			element.all(by.css('.Delete')).first().click();
			expect(browser.getCurrentUrl()).toContain('users');

			//Clicking View button
			element.all(by.css('.ViewBtn')).first().click();
			expect(browser.getCurrentUrl()).toContain('users/');

			//Clicking Hide button
			element(by.id('minbut')).click();
			expect(element(by.id('Text')).isDisplayed()).toBeFalsy();

			//Clicking Show button
			element(by.id('maxbut')).click();
			expect(element(by.id('Text')).isDisplayed()).toBeTruthy();

			//Clicking Edit and Save buttons
			element(by.id('Edit')).click();
			add('River')
			element(by.id('Save')).click();

			//Clicking Edit and Cancel buttons
			element(by.id('Edit')).click();
			element(by.id('Cancel')).click();
		});
	});
});