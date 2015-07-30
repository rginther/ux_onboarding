// spec.js

describe('ux_onboarding App', function() {
	var mockModule;
	beforeEach(function() {
	    mockModule = require('./e2eMocks');

	    browser.addMockModule('userManagementMock', mockModule.signup_request);

	    browser.get('http://localhost:8080');
	});

	

	//This allows you to view the window being tested better by slowing it down
	var origFn = browser.driver.controlFlow().execute;

	browser.driver.controlFlow().execute = function() {
		var args = arguments;

		origFn.call(browser.driver.controlFlow(), function() {
			return protractor.promise.delayed(150);
		});

		return origFn.apply(browser.driver.controlFlow(), args);
	};

	describe('ngRoute', function() {

		var firstName = element(by.model('user.firstName'));
		var lastName = element(by.model('user.lastName'));
		var phone = element(by.model('user.phone'));
		var email = element(by.model('user.email'));

		function add(a, b, c, d) {
			firstName.sendKeys(a);
			lastName.sendKeys(b);
			phone.sendKeys(c);
			email.sendKeys(d);

			element(by.css('.Add')).click();
		}

		it('should test the Create User tab', function() {

			element.all(by.className('nav')).first().click();

			element.all(by.css('.Create User')).click();
			expect(browser.getCurrentUrl()).toContain('create');

			add('Jake','Long', '111-111-1111', 'example@email00000.com');

		});
	});

	describe('ngRoute', function() {
		var firstName = element(by.model('editablefirstName'));

		function add(a) {
			firstName.sendKeys(a);
		}

		it('should test the Users tab', function() {
			element.all(by.css('.Users')).click();
			expect(browser.getCurrentUrl()).toContain('users');

			element(by.model('query')).sendKeys('Test2');

			element.all(by.css('.Users')).click();
			expect(browser.getCurrentUrl()).toContain('users');

			element.all(by.css('.ViewBtn')).first().click();
			expect(browser.getCurrentUrl()).toContain('users/');

			element(by.id('minbut')).click();
			expect(element(by.id('Text')).isDisplayed()).toBeFalsy();

			element(by.id('maxbut')).click();
			expect(element(by.id('Text')).isDisplayed()).toBeTruthy();

			element(by.id('Edit')).click();
			add('River')
			element(by.className('Save')).click();

			element(by.id('Edit')).click();
			element(by.className('Cancel')).click();

			element.all(by.css('.Users')).click();
			expect(browser.getCurrentUrl()).toContain('users');

			element.all(by.css('.Delete')).first().click();
			expect(browser.getCurrentUrl()).toContain('users');
		});
	});
});