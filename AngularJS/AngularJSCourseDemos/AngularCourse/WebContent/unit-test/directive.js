var app = angular.module('plunker', []);
app.directive('sampleOne', function (){
    // this is an attribute with no required controllers, 
    // and no isolated scope, so we're going to use all the
    // defaults, and just providing a linking function.
    
    return function(scope, elem, attrs) {
      elem.bind('click', function(){
        elem.text(scope.$eval(attrs.sampleOne));
      });
    };
});