(function() {
  'use strict';

  angular
    .module('App')
    .controller('MainController', MainController);

    MainController.inject = ['$scope', 'dataAssistant'];

    function MainController($scope, dataAssistant) {
		$scope.user = {};

		$scope.profile = function(){
			dataAssistant.get('/.auth/me').then(function(data){
				$scope.user = data;
				$scope.page = 'profile';
				console.log('user:' + JSON.stringify(data));
			}, function(error){
				$scope.user = {};
				$scope.user_error = error;
				$scope.page = 'news';
			});
		};		
      
		$scope.showProfile = function(){
			$scope.page = 'profile';
			
		};

		$scope.showLogin = function(){
			$scope.page = 'login';
		};

		$scope.showNews = function(){
			$scope.page = 'news';
		}
						
    }
})();