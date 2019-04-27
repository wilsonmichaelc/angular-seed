// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const jasmineReporters = require('jasmine-reporters');

const reportsDirectory = './reports';
const dashboardReportDirectory = reportsDirectory + '/dashboardReport';
const detailsReportDirectory = reportsDirectory + '/detailReport';

var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
  dest: detailsReportDirectory,
  filename: 'E2ETestingReport.html',
  reportTitle: "E2E Testing Report",
  showSummary: true,
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true,
});

exports.config = {
  allScriptsTimeout: 11000,
  suites: {
    login: './src/login/*.e2e-spec.ts',
    home: [
      './src/**/*.e2e-spec.ts'
    ]
  },
  plugins: [
    {
      axe: true,
      chromeA11YDevTools: {
        treatWarningsAsFailures: true,
        auditConfiguration: {
          auditRulesToSkip: []
        }
      },
      package: 'protractor-accessibility-plugin'
    }
  ],
  // multiCapabilities: [
  //       {browserName: 'chrome',
  //       chromeOptions: {args:['no-sandbox','--headless','disable-gpu']}}
  //   ],
  capabilities: {
    chromeOptions: { args: ['no-sandbox', '--headless', 'disable-gpu'] },
    browserName: process.env.PROTRACTOR_BROWSER || 'chrome',
    seleniumServerJar: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.6.0.jar'
  },
  // Only works with Chrome and Firefox
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.beforeLaunch(resolve);
    });
  },
  onPrepare: function () {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });

    // Screenshots
    jasmine.getEnv().addReporter(ScreenshotAndStackReporter);

    // Better console spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    // xml report generated for dashboard
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: reportsDirectory + '/xml',
      filePrefix: 'xmlOutput'
    }));

    const fs = require('fs-extra');
    if (!fs.existsSync(dashboardReportDirectory)) {
      fs.mkdirSync(dashboardReportDirectory);
    }

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(dashboardReportDirectory + '/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });

    // Check for environment credentials
    if ((typeof process.env.PROTRACTOR_USERNAME === 'undefined') || (typeof process.env.PROTRACTOR_PASSWORD === 'undefined')) {
      console.error('WARNING: System environment variable username/password are not set, tests will likely fail.')
    }
  },
  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');
      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: dashboardReportDirectory,
        outputFilename: 'index',
        screenshotPath: './',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
    });
  }
};
