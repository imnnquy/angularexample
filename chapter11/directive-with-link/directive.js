// File: chapter11/directive-with-link/directive.js
angular.module('stockMarketApp')
  .directive('stockWidget', [function() {
    return {
      templateUrl: function(element, attrs){
        return 'stock.html';
      },      
      restrict: 'AE',
      link: function(scope, element, attrs) {
        scope.getChange = function(stock) {
          return Math.ceil(((stock.price - stock.previous) /
              stock.previous) * 100);
        };
        scope.quytest = "quytestxongroi";
      }

    };
  }]);
