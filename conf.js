// An example configuration file.
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  //directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
   
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine2',
  
  

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['zoo_spec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
	showColors : true,
    defaultTimeoutInterval: 30000
  },
  
  onPrepare() {
  // var jasmineReporters = require('jasmine-reporters');
    /* jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: 'testresults',
        filePrefix: 'xmloutput'
    })); */
	jasmine.getEnv().addReporter(new HtmlReporter({
         //baseDirectory: 'Protractor Reports/screenshots'
		 baseDirectory: 'C:/Users/rahul.shah/.jenkins/workspace/testProject_ProtractorCI/Protractor Reports/screenshots'
		 ,excludeSkippedSpecs: true
      }).getJasmine2Reporter());
  }
  
  
};
