'use strict';

/**
 * @ngdoc overview
 * @name kceditWebApp
 * @description
 * # kceditWebApp
 *
 * Main module of the application.
 */
angular.module('kceditWebApp',[
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'ui.tree',
  'ui.bootstrap',
  'ng-context-menu',
  'kceditWebApp.directives',
  'kceditWebApp.services',
  'kceditWebApp.mainframe'
]);
angular.module('kceditWebApp').config(['$httpProvider',function($httpProvider){
  $httpProvider.defaults.withCredentials = true;
}]);
angular.module('kceditWebApp').run(['$state',function($state){
  $state.go('login');
}]);

