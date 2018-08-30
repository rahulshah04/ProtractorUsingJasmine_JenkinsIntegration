require('../npm/confirm_page.js');

var animalPage = function(){
	
	this.animalDropdown = element(by.model('animal'));
	this.continueButton = element(by.buttonText('CONTINUE'));
	
	this.selectAnimalDropdown = function(index){
		this.animalDropdown.$('[value="' + index + '"]').click();
	};
	
	this.clickContinueButton = function(){
		this.continueButton.click();
		return require('../npm/confirm_page.js');
	};
};

module.exports = new animalPage();