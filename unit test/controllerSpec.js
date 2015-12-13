// File: chapter3/controllerSpec.js
describe('Controller: SeccondController', function() {
  // Instantiate a new version of my module before each test
  beforeEach(module('myApp2'));

  var ctrl;

  // Before each unit test, instantiate a new instance
  // of the controller
  beforeEach(inject(function($controller) {
    ctrl = $controller('SeccondController');
  }));

  it('Fuck it, it\'s not changed', function() {
    var oldMessage = ctrl.message;
    ctrl.changeMessage();
    expect(ctrl.message).not.toEqual(oldMessage);
  });

});
