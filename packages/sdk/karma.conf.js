module.exports = function (config) {
  config.set({
    client: {
      jasmine: {
        timeoutInterval: 15000
      }
    }, // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    plugins: Object.keys(require('./package').devDependencies)
      .flatMap(packageName => {
        if (!packageName.startsWith('karma-')) return [];
        return [require(packageName)];
      }),

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      {
        pattern: 'test/**/*.test.js',
        type: 'module',
        watched: false
      },
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.test.js': ['esbuild']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'html', subdir: 'html'
      }],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      },
      includeAllSources: true
    },
    jasmineDiffReporter: {
      pretty: true
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeDebugging'],
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
      }
    },
    singleRun: !config.debug,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    captureTimeout: 3000000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 3000000,
    browserNoActivityTimeout: 3000000,
    esbuild: {
      define: {
        IS_WEBRTC: !config.wasm,
        useWt: true,
        assetsPath: `'${config.assetsPath || '/base/dist'}'`
      }
    }
  });
};
