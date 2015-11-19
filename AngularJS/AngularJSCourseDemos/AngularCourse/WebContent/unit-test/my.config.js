module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'angular.min.js',
      'angular-mock.js',
      '*.js',
    ],
    exclude: [
      
    ],
    preprocessors: {
    
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
