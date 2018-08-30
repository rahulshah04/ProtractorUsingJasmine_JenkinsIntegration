module.exports = function (grunt) {
  grunt.initConfig({

  //Package.json file is needed only if projet is configured in package.json file
  
   pkg: grunt.file.readJSON('package.json'),
    protractor_webdriver: {
        your_target: {
            options: {
                path: 'C:/Users/rahul.shah/AppData/Roaming/npm/node_modules/protractor/bin',
                command: 'webdriver-manager start'
            }
        }
    }, 
    protractor: {
        options: {
            configFile: "conf.js", // Default config file
            keepAlive: true, // If false, the grunt process stops when the test fails.
            noColor: false, // If true, protractor will not use colors in its output.
			WebdriverManagerUpdate: true,
            args: {}
        },
        your_target: {
            options: {
                configFile: "conf.js", // Target-specific config file
				keepAlive: true, // If false, the grunt process stops when the test fails.
				WebdriverManagerUpdate: true,
                args: {} // Target-specific arguments
            }
        }
	},
	shell: {
      options: {
        stdout: true
      },
		 protractor_install: {
			command: 'node ./node_modules/protractor/bin/webdriver-manager update'
		},
		npm_install: {
			command: 'npm install'
      }
    }
});

//Protractor runner for Grunt Task
grunt.loadNpmTasks('grunt-protractor-runner'); 

grunt.registerTask('install', [
    'shell:npm_install'
]);

grunt.registerTask('update', [
    'shell:protractor_install'
]);

grunt.registerTask('testSampleTest', [
    'protractor:your_target'
]);
 
};