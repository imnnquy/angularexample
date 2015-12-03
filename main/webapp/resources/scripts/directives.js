'use strict'

angular.module('kceditWebApp.directives',[]);

angular.module('kceditWebApp.directives').directive('appVersion',['version',function(version){
	return {
		restrict: 'AE',
		link: function(scope,elem,attrs){
			elem.html(version);
		}
	}	
}])
.directive('fileUpload', function($log, $parse) {
        return {
          restrict: 'A',
          link: function(scope, element, attrs) {
            var options = $parse(attrs.fileUpload)(scope) || {};
            controllerAs: 'MainframeController',
            element.fileupload({
              dataType: 'json',
              url: '/uploadFile',
              done: function(e, data) {
                $log.log("done accessed");
              },
              fail: function(e, data) {
                $log.log("fail accessed");
              },
              progress: function(e, data) {
                options.progress = parseInt(data.loaded / data.total * 100, 10);
                scope.$apply();
                $log.log(options)
                $log.log("progress");
              },             
            });
          }
        }
      })
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            controllerAs: 'MainframeController',
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);