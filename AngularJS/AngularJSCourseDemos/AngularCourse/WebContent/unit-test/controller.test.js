describe('Testing a controller', function() {
  var $scope, ctrl, service;
 
  beforeEach(function (){
    // load the module you're testing.
    module('myApp');
    
    inject(function($rootScope, $controller) {
      // create a scope object for us to use.
      $scope = $rootScope.$new();
      
      service = $injector.get('basicService');
      ctrl = $controller('MainCtrl', {$scope: $scope, basicService: service});
    });
  });
 
  it('should start with foo and bar populated', function() {
    //just assert. $scope was set up in beforeEach() (above)
    expect($scope.foo).toEqual('foo');
    
    ctrl.changeFoo();
    
    expect($scope.foo).toEqual('foo!!!');
  });
  
  // check to see if it does what it's supposed to do.
  it('should make text exciting', function (){
    var result = service.exciteText('bar');
    expect(result).toBe('bar!!!');
  });
  
});