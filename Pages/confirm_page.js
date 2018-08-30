var confirmPage = function(){
	
	this.confirmPageText = element(by.css('h1'));
	
	this.getConfirmPageTitle = function(){
		return this.confirmPageText.getText();
	};
	
};

module.exports = new confirmPage();