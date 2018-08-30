describe('Test zoo site for input text for homepage', function() {
	
	beforeEach(function(){
		
		browser.get('http://www.thetestroom.com/jswebapp/');
		
	});
	
	afterEach(function(){
		console.log("After Method is executed");
	});
	
  it('Test input and check text output', function() {
	
	expect(browser.getCurrentUrl()).toContain("jswebapp");
	expect(browser.getCurrentUrl()).toEqual("http://www.thetestroom.com/jswebapp/")
  });
  
  it('Test the input text and output text is in sync', function() {
	  var textMessage = "Dynamic Text";
		element(by.model('person.name')).sendKeys(textMessage);

		element(by.binding('person.name')).getText().then(function(text){
			expect(text).toEqual("Dynamic Text");
	});
	
 });
	
	it('Check correct number of item in dropdown', function() {
		 element(by.buttonText("CONTINUE")).click();
		
		 element(by.model("animal")).$('[value="1"]').click();
		 element.all(by.css(".ng-pristine option")).then(function(optionDropdown){
			expect(optionDropdown.length).toBe(4);
			expect(optionDropdown[1].getText()).toBe("George the Turtle");
		});
		
	});	
		it('Check user is on Thank You page', function() {
			element(by.buttonText("CONTINUE")).click();
			element(by.buttonText("CONTINUE")).click();
			expect(browser.getCurrentUrl()).toContain("confirm");
			
		});
		
	var testData = require('../npm/TestData.json');
	
	// element(by.partialButtonText("CONTI")).click();
	
	var home_Page = require('../npm/home_page.js');
	
	it('Test the input text and output text is in sync using Page Objects', function() {
		home_Page.enterFeildValue(testData[1].textBoxFieldValue);
		var getHomePageText = home_Page.getDynamicText();
		
		expect(getHomePageText).toBe("I will subscribe");
		var animal_Page = home_Page.clickContinueButton();
		
		animal_Page.selectAnimalDropdown(testData[1].dropDownOptions);
		var confirm_Page = animal_Page.clickContinueButton();
		
		expect(confirm_Page.getConfirmPageTitle()).toBe(testData[1].confirmPageTitle);
		
	});
  
 });