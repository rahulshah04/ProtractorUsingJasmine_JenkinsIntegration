var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = {
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    };

    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5392,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532946836338,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532946836792,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532946837759,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1532946837798,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532946837872,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532946838321,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532946838434,
                "type": ""
            }
        ],
        "screenShotFile": "00130082-00b6-001b-0038-00d1007a006c.png",
        "timestamp": 1532946835684,
        "duration": 2842
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948147290,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948147689,
                "type": ""
            }
        ],
        "screenShotFile": "00d100fa-0030-0040-006b-00b7007f00a5.png",
        "timestamp": 1532948146739,
        "duration": 1473
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948149120,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948149230,
                "type": ""
            }
        ],
        "screenShotFile": "007e004e-0001-0031-0017-00ca00f7008b.png",
        "timestamp": 1532948148748,
        "duration": 717
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948150119,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948150221,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948150745,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1532948150764,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948150841,
                "type": ""
            }
        ],
        "screenShotFile": "0007008a-00b5-00b8-005d-006a00f100f7.png",
        "timestamp": 1532948149773,
        "duration": 1234
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948151650,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948151766,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948152213,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1532948152254,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948152327,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948152712,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948152823,
                "type": ""
            }
        ],
        "screenShotFile": "006100c1-001e-000e-009e-006f009d00c3.png",
        "timestamp": 1532948151307,
        "duration": 1600
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948153548,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948153657,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948154241,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1532948154277,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948154354,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1532948154817,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1532948154930,
                "type": ""
            }
        ],
        "screenShotFile": "00e20018-0057-0026-00ae-001600ea00d6.png",
        "timestamp": 1532948153196,
        "duration": 1843
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125450224,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125450785,
                "type": ""
            }
        ],
        "screenShotFile": "00c300ff-000f-0055-00ae-004b00b200ab.png",
        "timestamp": 1533125449229,
        "duration": 2009
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125452868,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125453045,
                "type": ""
            }
        ],
        "screenShotFile": "003d0071-0052-0078-007e-00cc005c0095.png",
        "timestamp": 1533125452536,
        "duration": 696
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125453806,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125453946,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125454397,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533125454429,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125454545,
                "type": ""
            }
        ],
        "screenShotFile": "00db0047-0065-000b-001b-004b0066002b.png",
        "timestamp": 1533125453507,
        "duration": 1146
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125455240,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125455358,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125455823,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533125455844,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125455973,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125456354,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125456508,
                "type": ""
            }
        ],
        "screenShotFile": "0062002b-0000-00c3-00c8-002c00060033.png",
        "timestamp": 1533125454914,
        "duration": 1615
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125457130,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125457272,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125457848,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533125457863,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125458078,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533125458461,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533125458602,
                "type": ""
            }
        ],
        "screenShotFile": "00040078-0091-00d1-0037-00460093007f.png",
        "timestamp": 1533125456838,
        "duration": 1810
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2892,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193283964,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193284745,
                "type": ""
            }
        ],
        "screenShotFile": "009300db-008f-0095-007f-008c004f002b.png",
        "timestamp": 1533193282603,
        "duration": 2580
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2892,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193287250,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193287417,
                "type": ""
            }
        ],
        "screenShotFile": "00a60042-000b-00a1-0099-00e400750008.png",
        "timestamp": 1533193286917,
        "duration": 876
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2892,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193288478,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193288642,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193289178,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533193289203,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193289683,
                "type": ""
            }
        ],
        "screenShotFile": "00a500df-00a9-00bd-00d9-00e1009c00a8.png",
        "timestamp": 1533193288125,
        "duration": 1671
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2892,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193290504,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193290679,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193291302,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533193291331,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193291470,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193291931,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193292117,
                "type": ""
            }
        ],
        "screenShotFile": "00f70056-00ee-005c-0040-001e0025007f.png",
        "timestamp": 1533193290093,
        "duration": 2069
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2892,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193292881,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193293050,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193293694,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533193293730,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193294022,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533193294468,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533193294616,
                "type": ""
            }
        ],
        "screenShotFile": "0009002c-0035-007f-00ff-00c000980029.png",
        "timestamp": 1533193292466,
        "duration": 2201
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7364,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211689865,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211690533,
                "type": ""
            }
        ],
        "screenShotFile": "0048003f-00d5-00b9-00a1-007000960064.png",
        "timestamp": 1533211688685,
        "duration": 2371
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7364,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211693183,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211693337,
                "type": ""
            }
        ],
        "screenShotFile": "008800d5-00bb-003f-00f6-004300d70040.png",
        "timestamp": 1533211692786,
        "duration": 906
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7364,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211694394,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211694512,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211694956,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533211694993,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211695115,
                "type": ""
            }
        ],
        "screenShotFile": "001700f9-0005-0056-00dd-0034008600fc.png",
        "timestamp": 1533211694019,
        "duration": 1202
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7364,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211695935,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211696043,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211696640,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533211696673,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211696753,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211697105,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211697275,
                "type": ""
            }
        ],
        "screenShotFile": "00f800e3-0092-00c9-00e8-002200d6005d.png",
        "timestamp": 1533211695528,
        "duration": 1794
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7364,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211698034,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211698140,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211698711,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533211698731,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211698819,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533211699228,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533211699388,
                "type": ""
            }
        ],
        "screenShotFile": "002700fc-0003-000d-0093-004100da00d1.png",
        "timestamp": 1533211697627,
        "duration": 1806
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e9b5109113e79b43d8d5cdb93f63082c",
        "instanceId": 17608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213778659,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213779138,
                "type": ""
            }
        ],
        "screenShotFile": "00df00cc-0037-00a5-0033-006800010045.png",
        "timestamp": 1533213777972,
        "duration": 1717
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e9b5109113e79b43d8d5cdb93f63082c",
        "instanceId": 17608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213780741,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213780836,
                "type": ""
            }
        ],
        "screenShotFile": "00870026-00ef-0004-00ca-009e00be0073.png",
        "timestamp": 1533213780415,
        "duration": 648
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e9b5109113e79b43d8d5cdb93f63082c",
        "instanceId": 17608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213781739,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213781867,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213782300,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533213782317,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213782470,
                "type": ""
            }
        ],
        "screenShotFile": "001a0094-0062-00f7-006f-00d2009d00a9.png",
        "timestamp": 1533213781387,
        "duration": 1214
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e9b5109113e79b43d8d5cdb93f63082c",
        "instanceId": 17608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213783271,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213783374,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213783900,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533213783912,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213784048,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213784497,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213784652,
                "type": ""
            }
        ],
        "screenShotFile": "00680029-000b-00dc-003e-0029000b0007.png",
        "timestamp": 1533213782909,
        "duration": 1780
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e9b5109113e79b43d8d5cdb93f63082c",
        "instanceId": 17608,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213785392,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213785500,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213786362,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533213786394,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213786520,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533213787008,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533213787150,
                "type": ""
            }
        ],
        "screenShotFile": "00ac00f1-0089-0005-0040-009b001500be.png",
        "timestamp": 1533213785018,
        "duration": 2263
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "80ce8bb5f4024e8488c87bcc1384090e",
        "instanceId": 14224,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214622643,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214622783,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214623141,
                "type": ""
            }
        ],
        "screenShotFile": "009f0052-001d-00ac-00d8-009d00e6000c.png",
        "timestamp": 1533214622015,
        "duration": 1649
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "80ce8bb5f4024e8488c87bcc1384090e",
        "instanceId": 14224,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214624551,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214624645,
                "type": ""
            }
        ],
        "screenShotFile": "003800a9-008e-00dc-00bd-008400f300b8.png",
        "timestamp": 1533214624208,
        "duration": 679
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "80ce8bb5f4024e8488c87bcc1384090e",
        "instanceId": 14224,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214625595,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214625708,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214626211,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533214626251,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214626358,
                "type": ""
            }
        ],
        "screenShotFile": "00af0077-00c3-008d-00b1-005a00100041.png",
        "timestamp": 1533214625211,
        "duration": 1324
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "80ce8bb5f4024e8488c87bcc1384090e",
        "instanceId": 14224,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214627255,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214627385,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214627849,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533214627868,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214628018,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214628425,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214628544,
                "type": ""
            }
        ],
        "screenShotFile": "00410061-009b-00c9-0034-000400f00056.png",
        "timestamp": 1533214626873,
        "duration": 1733
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "80ce8bb5f4024e8488c87bcc1384090e",
        "instanceId": 14224,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214629266,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214629370,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214630047,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533214630080,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214630196,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533214630595,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533214630690,
                "type": ""
            }
        ],
        "screenShotFile": "00d30018-00bd-00a1-0028-009500b200d5.png",
        "timestamp": 1533214628928,
        "duration": 1822
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "02a406a0eed1d2ea54ccc943ba97fac3",
        "instanceId": 7192,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273725188,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273725890,
                "type": ""
            }
        ],
        "screenShotFile": "002a00ea-0066-00e4-008e-008100cd0051.png",
        "timestamp": 1533273724225,
        "duration": 2341
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "02a406a0eed1d2ea54ccc943ba97fac3",
        "instanceId": 7192,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273728601,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273728710,
                "type": ""
            }
        ],
        "screenShotFile": "00f2009b-00ec-0060-0074-008a000a00ef.png",
        "timestamp": 1533273728197,
        "duration": 1169
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "02a406a0eed1d2ea54ccc943ba97fac3",
        "instanceId": 7192,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273730217,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273730331,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273731144,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533273731169,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273731248,
                "type": ""
            }
        ],
        "screenShotFile": "00af0078-00ad-002d-0036-00f400b60047.png",
        "timestamp": 1533273729768,
        "duration": 1882
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "02a406a0eed1d2ea54ccc943ba97fac3",
        "instanceId": 7192,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273732474,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273732585,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273733505,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533273733540,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273733626,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273734203,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273734302,
                "type": ""
            }
        ],
        "screenShotFile": "00f00084-00bd-00e8-0091-007a00c50028.png",
        "timestamp": 1533273732060,
        "duration": 2470
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "02a406a0eed1d2ea54ccc943ba97fac3",
        "instanceId": 7192,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273735347,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273735447,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273736618,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533273736653,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273736725,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533273737170,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533273737271,
                "type": ""
            }
        ],
        "screenShotFile": "004400e5-003b-00a2-0034-00660007001d.png",
        "timestamp": 1533273734948,
        "duration": 2440
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "89e0e0867cb7370a32c6cf769f1507c8",
        "instanceId": 17804,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276350212,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276350881,
                "type": ""
            }
        ],
        "screenShotFile": "00930012-00bd-00aa-00e9-00fb007000a9.png",
        "timestamp": 1533276349582,
        "duration": 1727
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "89e0e0867cb7370a32c6cf769f1507c8",
        "instanceId": 17804,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276352318,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276352479,
                "type": ""
            }
        ],
        "screenShotFile": "003700a6-00aa-0066-00c7-00b400770093.png",
        "timestamp": 1533276351950,
        "duration": 774
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "89e0e0867cb7370a32c6cf769f1507c8",
        "instanceId": 17804,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276353437,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276353548,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276353958,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276353976,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276354053,
                "type": ""
            }
        ],
        "screenShotFile": "006700f6-0041-0028-0092-00ed002400a8.png",
        "timestamp": 1533276353067,
        "duration": 1128
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "89e0e0867cb7370a32c6cf769f1507c8",
        "instanceId": 17804,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276354872,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276354980,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276355527,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276355551,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276355637,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276356112,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276356224,
                "type": ""
            }
        ],
        "screenShotFile": "00050055-00ea-0085-0024-00ed00d90078.png",
        "timestamp": 1533276354532,
        "duration": 1749
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "89e0e0867cb7370a32c6cf769f1507c8",
        "instanceId": 17804,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276356935,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276357050,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276357852,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276357882,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276357961,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276358365,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276358464,
                "type": ""
            }
        ],
        "screenShotFile": "0048001b-00de-00e8-0049-00ef003d0070.png",
        "timestamp": 1533276356583,
        "duration": 1978
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "472fe12fdbab4214715334dc85e3f3e2",
        "instanceId": 12512,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276611556,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276612174,
                "type": ""
            }
        ],
        "screenShotFile": "00870072-00bc-0096-00cc-003b004300a1.png",
        "timestamp": 1533276610691,
        "duration": 1870
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "472fe12fdbab4214715334dc85e3f3e2",
        "instanceId": 12512,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276613604,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276613975,
                "type": ""
            }
        ],
        "screenShotFile": "00d200a3-00ad-00f5-00a0-0041001f009c.png",
        "timestamp": 1533276613223,
        "duration": 1057
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "472fe12fdbab4214715334dc85e3f3e2",
        "instanceId": 12512,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276614973,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276615332,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276615820,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276615865,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276616185,
                "type": ""
            }
        ],
        "screenShotFile": "00b3001d-00fa-00a3-000c-00e4006100dc.png",
        "timestamp": 1533276614620,
        "duration": 1724
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "472fe12fdbab4214715334dc85e3f3e2",
        "instanceId": 12512,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276617054,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276617423,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276617952,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276617972,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276618427,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276618890,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276619591,
                "type": ""
            }
        ],
        "screenShotFile": "001d0099-0030-002e-0014-00cb009900a4.png",
        "timestamp": 1533276616668,
        "duration": 2977
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "472fe12fdbab4214715334dc85e3f3e2",
        "instanceId": 12512,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276620413,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276620897,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276621673,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276621692,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276622027,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276622490,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276622849,
                "type": ""
            }
        ],
        "screenShotFile": "0067006c-0090-0033-0066-00d3006400bb.png",
        "timestamp": 1533276619994,
        "duration": 2948
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "31b199b8d8ac41de276eedbeec73c408",
        "instanceId": 20968,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276631508,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276632485,
                "type": ""
            }
        ],
        "screenShotFile": "00e200c1-00d4-002a-00c5-00d2006e00da.png",
        "timestamp": 1533276630896,
        "duration": 1899
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "31b199b8d8ac41de276eedbeec73c408",
        "instanceId": 20968,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276633806,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276634153,
                "type": ""
            }
        ],
        "screenShotFile": "007700e4-0084-0060-00ae-001b00040096.png",
        "timestamp": 1533276633421,
        "duration": 1009
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "31b199b8d8ac41de276eedbeec73c408",
        "instanceId": 20968,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276635067,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276635416,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276635913,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276635950,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276636284,
                "type": ""
            }
        ],
        "screenShotFile": "00840031-0047-00c5-00c3-00be006800b6.png",
        "timestamp": 1533276634750,
        "duration": 1727
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "31b199b8d8ac41de276eedbeec73c408",
        "instanceId": 20968,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276637132,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276637505,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276638205,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276638236,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276638579,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276639002,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276639616,
                "type": ""
            }
        ],
        "screenShotFile": "009300e4-0020-00d7-002d-0035006800f9.png",
        "timestamp": 1533276636796,
        "duration": 2879
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "31b199b8d8ac41de276eedbeec73c408",
        "instanceId": 20968,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276640370,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276640728,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276641408,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276641425,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276641755,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276642240,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276642603,
                "type": ""
            }
        ],
        "screenShotFile": "00bf0025-007c-0010-00fb-00db00d90016.png",
        "timestamp": 1533276640041,
        "duration": 2674
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "54321a01decf9e4214e072c967968700",
        "instanceId": 18952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276651207,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276652276,
                "type": ""
            }
        ],
        "screenShotFile": "00440056-004f-0047-0078-00c600eb0016.png",
        "timestamp": 1533276650668,
        "duration": 1773
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "54321a01decf9e4214e072c967968700",
        "instanceId": 18952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276653518,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276653860,
                "type": ""
            }
        ],
        "screenShotFile": "007c0089-00a0-00e1-0071-00f200f90084.png",
        "timestamp": 1533276653081,
        "duration": 968
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "54321a01decf9e4214e072c967968700",
        "instanceId": 18952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276654795,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276655144,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276655643,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276655670,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276655979,
                "type": ""
            }
        ],
        "screenShotFile": "00400007-0059-0041-00ae-003f005300bd.png",
        "timestamp": 1533276654396,
        "duration": 1693
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "54321a01decf9e4214e072c967968700",
        "instanceId": 18952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276656781,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276657144,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276657781,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276657812,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276658142,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276658547,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276659138,
                "type": ""
            }
        ],
        "screenShotFile": "0070006c-00f2-0068-00aa-00f7007000b4.png",
        "timestamp": 1533276656428,
        "duration": 2749
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "54321a01decf9e4214e072c967968700",
        "instanceId": 18952,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276659901,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276660244,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276660801,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533276660820,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276661153,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533276661601,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533276661966,
                "type": ""
            }
        ],
        "screenShotFile": "009c0090-005b-009b-006a-000f00e80095.png",
        "timestamp": 1533276659522,
        "duration": 2532
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7b72d486c770d088c42abf6393c810bd",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277042718,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277043282,
                "type": ""
            }
        ],
        "screenShotFile": "00f30028-0079-00f1-009e-006f008600e1.png",
        "timestamp": 1533277042133,
        "duration": 1614
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7b72d486c770d088c42abf6393c810bd",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277044794,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277044913,
                "type": ""
            }
        ],
        "screenShotFile": "00a40033-00a3-00bf-0015-007a0004000a.png",
        "timestamp": 1533277044379,
        "duration": 798
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7b72d486c770d088c42abf6393c810bd",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277045896,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277046047,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277046676,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533277046711,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277046817,
                "type": ""
            }
        ],
        "screenShotFile": "00c800b9-0014-00a0-004d-002e00a80097.png",
        "timestamp": 1533277045519,
        "duration": 1476
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7b72d486c770d088c42abf6393c810bd",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277047800,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277047947,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277048717,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533277048747,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277048857,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277049435,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277049670,
                "type": ""
            }
        ],
        "screenShotFile": "00ea0086-00e7-0083-008e-003100bf00db.png",
        "timestamp": 1533277047315,
        "duration": 2408
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7b72d486c770d088c42abf6393c810bd",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277050370,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277050532,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277051160,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533277051178,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277051269,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277051781,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277051897,
                "type": ""
            }
        ],
        "screenShotFile": "00a60095-00ad-00eb-006b-004900870060.png",
        "timestamp": 1533277050064,
        "duration": 1929
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "98330e0b48bd842e76c82bcca7826cd4",
        "instanceId": 22228,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277135118,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277135609,
                "type": ""
            }
        ],
        "screenShotFile": "009c00a7-0059-00d8-004f-002c00bf0009.png",
        "timestamp": 1533277134545,
        "duration": 2163
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "98330e0b48bd842e76c82bcca7826cd4",
        "instanceId": 22228,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277137656,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277137765,
                "type": ""
            }
        ],
        "screenShotFile": "003900c4-004a-00ab-0041-007f00100014.png",
        "timestamp": 1533277137311,
        "duration": 805
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "98330e0b48bd842e76c82bcca7826cd4",
        "instanceId": 22228,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277138806,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277138905,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277139546,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533277139580,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277139656,
                "type": ""
            }
        ],
        "screenShotFile": "0094003f-00a2-0059-0056-001d001f006a.png",
        "timestamp": 1533277138447,
        "duration": 1390
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "98330e0b48bd842e76c82bcca7826cd4",
        "instanceId": 22228,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277140556,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277140685,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277141381,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533277141397,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277141538,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277141955,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277142056,
                "type": ""
            }
        ],
        "screenShotFile": "004a00d8-002a-008d-008e-007a00b6003d.png",
        "timestamp": 1533277140176,
        "duration": 1922
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "98330e0b48bd842e76c82bcca7826cd4",
        "instanceId": 22228,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277142750,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277142867,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277143486,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533277143513,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277143594,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533277144101,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533277144209,
                "type": ""
            }
        ],
        "screenShotFile": "00a00046-0038-00e3-002a-00c200f40071.png",
        "timestamp": 1533277142417,
        "duration": 1932
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "643974392d6ac0f27bcdb1e72d7ec76f",
        "instanceId": 20876,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280110146,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280111120,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280113079,
                "type": ""
            }
        ],
        "screenShotFile": "0073009f-0083-00ed-009b-00e900a00051.png",
        "timestamp": 1533280109611,
        "duration": 3788
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "643974392d6ac0f27bcdb1e72d7ec76f",
        "instanceId": 20876,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280115118,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280115525,
                "type": ""
            }
        ],
        "screenShotFile": "00af0079-008f-0041-00b6-008b006d0065.png",
        "timestamp": 1533280114033,
        "duration": 1709
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "643974392d6ac0f27bcdb1e72d7ec76f",
        "instanceId": 20876,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280116733,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280117175,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280117763,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533280117780,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280118166,
                "type": ""
            }
        ],
        "screenShotFile": "000f00d1-008a-0026-0001-00be005a0046.png",
        "timestamp": 1533280116096,
        "duration": 2203
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "643974392d6ac0f27bcdb1e72d7ec76f",
        "instanceId": 20876,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280118973,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280119311,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280119771,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533280119790,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280120122,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280120578,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280120921,
                "type": ""
            }
        ],
        "screenShotFile": "005c00e0-0018-00be-0075-0050005200ea.png",
        "timestamp": 1533280118640,
        "duration": 2329
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "643974392d6ac0f27bcdb1e72d7ec76f",
        "instanceId": 20876,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280121752,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280122096,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280122715,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533280122749,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280123055,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280123498,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280123830,
                "type": ""
            }
        ],
        "screenShotFile": "001f0012-00b9-0051-0078-00a100f3001a.png",
        "timestamp": 1533280121406,
        "duration": 2527
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "faff33b1738b8d97308b991022fdffa2",
        "instanceId": 16176,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280555597,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280556101,
                "type": ""
            }
        ],
        "screenShotFile": "00f7007b-000e-00af-0077-00a0006e00cf.png",
        "timestamp": 1533280554708,
        "duration": 1985
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "faff33b1738b8d97308b991022fdffa2",
        "instanceId": 16176,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280557859,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280557975,
                "type": ""
            }
        ],
        "screenShotFile": "006c00da-000a-0032-005d-008d00240062.png",
        "timestamp": 1533280557422,
        "duration": 772
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "faff33b1738b8d97308b991022fdffa2",
        "instanceId": 16176,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280558921,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280559034,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280559493,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533280559511,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280559587,
                "type": ""
            }
        ],
        "screenShotFile": "00d9003d-0090-00a7-00e4-000f0079002f.png",
        "timestamp": 1533280558540,
        "duration": 1165
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "faff33b1738b8d97308b991022fdffa2",
        "instanceId": 16176,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280560354,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280560452,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280560932,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533280560956,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280561068,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280561405,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280561501,
                "type": ""
            }
        ],
        "screenShotFile": "0034002d-003a-00e8-007c-00d400b00080.png",
        "timestamp": 1533280560036,
        "duration": 1503
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "faff33b1738b8d97308b991022fdffa2",
        "instanceId": 16176,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280562275,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280562381,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280563117,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533280563138,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280563235,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280563638,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280563731,
                "type": ""
            }
        ],
        "screenShotFile": "001200bd-001f-0018-0092-00fe00840009.png",
        "timestamp": 1533280561878,
        "duration": 1908
    },
    {
        "description": "Test input and check text output|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e1fbbf2bb98f938cd974a807ee1b2ad7",
        "instanceId": 12956,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280653731,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280654118,
                "type": ""
            }
        ],
        "screenShotFile": "001f0065-0051-00e0-004c-004c000e009e.png",
        "timestamp": 1533280653193,
        "duration": 1460
    },
    {
        "description": "Test the input text and output text is in sync|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e1fbbf2bb98f938cd974a807ee1b2ad7",
        "instanceId": 12956,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280655697,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280655812,
                "type": ""
            }
        ],
        "screenShotFile": "00880078-0058-00b8-0058-001800bc00ed.png",
        "timestamp": 1533280655303,
        "duration": 737
    },
    {
        "description": "Check correct number of item in dropdown|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e1fbbf2bb98f938cd974a807ee1b2ad7",
        "instanceId": 12956,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280656838,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280656947,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280657397,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533280657439,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280657516,
                "type": ""
            }
        ],
        "screenShotFile": "00e000b2-004b-0052-00fe-007900ad009f.png",
        "timestamp": 1533280656418,
        "duration": 1221
    },
    {
        "description": "Check user is on Thank You page|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e1fbbf2bb98f938cd974a807ee1b2ad7",
        "instanceId": 12956,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280658294,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280658405,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280658826,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533280658853,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280658928,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280659319,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280659423,
                "type": ""
            }
        ],
        "screenShotFile": "00b700ab-00bb-0010-0080-006800260061.png",
        "timestamp": 1533280657932,
        "duration": 1554
    },
    {
        "description": "Test the input text and output text is in sync using Page Objects|Test zoo site for input text for homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e1fbbf2bb98f938cd974a807ee1b2ad7",
        "instanceId": 12956,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280660244,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280660341,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/animalselection.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280661103,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js 82:427 \"Error: [ngOptions:iexp] http://errors.angularjs.org/1.2.5/ngOptions/iexp?p0=animal%20in%20animals&p1=%3Cselect%20ng-model%3D%22animal%22%20ng-options%3D%22animal%20in%20animals%22%20class%3D%22ng-pristine%20ng-valid%22%3E\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:6:449\\n    at n (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:193:497)\\n    at link (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:196:134)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:142)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:49:83)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:172)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\\n    at f (https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js:42:189)\"",
                "timestamp": 1533280661121,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280661198,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.thetestroom.com/jswebapp/confirm.html - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1533280661669,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1533280661780,
                "type": ""
            }
        ],
        "screenShotFile": "00b300bf-00ff-002c-0070-000e00df0014.png",
        "timestamp": 1533280659942,
        "duration": 1915
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};