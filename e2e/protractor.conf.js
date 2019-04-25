// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  // multiCapabilities: [
  //       {browserName: 'chrome',
  //       chromeOptions: {args:['no-sandbox','--headless','disable-gpu']}}
  //   ],
  plugins: [{
    chromeA11YDevTools: {
      treatWarningsAsFailures: true,
      auditConfiguration: {
        auditRulesToSkip: []
      }
    },
    package: 'protractor-accessibility-plugin'
  }],
  capabilities: {
    chromeOptions: {args:['no-sandbox','--headless','disable-gpu']},
    browserName: process.env.PROTRACTOR_BROWSER || 'chrome',
    seleniumServerJar :'./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.6.0.jar'
  },
  // Only works with Chrome and Firefox
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: function () {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    // Better console spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
  }
};
