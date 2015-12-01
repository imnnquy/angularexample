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
    expect(ctrl.items).toEqual([
      {id: 1, label: 'First', done: true},
      {id: 2, label: 'Second', done: false}
    ]);
  });

  it('should have highlight items based on state', function() {
    var item = {id: 1, label: 'First', done: true};

    var actualClass = ctrl.getDoneClass(item);
    expect(actualClass.finished).toBeTruthy();
    expect(actualClass.unfinished).toBeFalsy();

    item.done = false;
    actualClass = ctrl.getDoneClass(item);
    expect(actualClass.finished).toBeFalsy();
    expect(actualClass.unfinished).toBeTruthy();
  });

});
