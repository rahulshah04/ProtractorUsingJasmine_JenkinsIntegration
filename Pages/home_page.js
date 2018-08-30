require('../npm/animal_page.js');

var homePage = function(){
	
	this.feildValueTextBox = element(by.model('person.name'));
	this.dynamicValueText = element(by.binding('person.name'));
	this.continueButton = element(by.buttonText('CONTINUE'));
	
	this.enterFeildValue = function(value){
		this.feildValueTextBox.sendKeys(value);
	};
	
	this.getDynamicText = function(){
		return this.dynamicValueText.getText();
	};
	
	this.clickContinueButton = function(){
		this.continueButton.click();
		return require('../npm/animal_page.js');
	};

};

module.exports = new homePage(); 