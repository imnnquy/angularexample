var app = angular.module('myApp', []);
 
/* Set up a simple controller with a few 
 * examples of common actions a controller function
 * might set up on a $scope. */
app.controller('MainCtrl', function($scope, basicService) {
  
  //set some properties
  $scope.foo = 'foo';
  $scope.bar = 'bar';
  
  
  //add a simple function.
  $scope.changeFoo = function (){
    $scope.foo = basicService.exciteText($scope.foo);
  };
});

app.factory('basicService', function(){
  return {
    exciteText: function(msg) {
      return msg + '!!!'
    }
  };
});