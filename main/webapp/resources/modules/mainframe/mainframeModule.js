'use strict'

angular.module('kceditWebApp.mainframe', ['kceditWebApp.mainframe.controllers', 'kceditWebApp.mainframe.services']);

angular.module('kceditWebApp.mainframe').config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('mainframe', {
			url: '/mainframe',
			views: {
				'': {
					templateUrl: 'modules/mainframe/views/mainframe.html',
					controller: 'MainframeController'/*,
					resolve: {
						user: ['UserService', '$q', function(UserService, $q) {
							return UserService.user || $q.reject({
								unAuthorized: true
							});
						}]
					}*/
				},
				'outlineTree@mainframe': {
					templateUrl: 'modules/mainframe/views/outline-tree.html',
					controller: 'OutlineTreeController'
				}
			}

		}).state('mainframe.oulineTree', {
			url: '/outline/:id/edit',
			templateUrl: 'modules/mainframe/views/design-style-panel.html',
			controller: 'DesignStylePanelController'
		})
		.state('login', {
			url: '/login',
			controller: 'LoginController',
			resolve:{
			    user:['UserService','$q',function(UserService,$q){
			        if(UserService.user){
			            return $q.reject({authorized:true});
			        }
			    }]
			},
			templateUrl: 'modules/mainframe/views/login.html'
		});
}]).run(['$rootScope', '$state', '$cookieStore', 'UserService', function($rootScope, $state, $cookieStore, UserService) {

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {

		if (error.unAuthorized) {
			$state.go('login');
		} else if (error.authorized) {
			$state.go('mainframe');
		}
	});

	UserService.user = $cookieStore.get('user');

}]);