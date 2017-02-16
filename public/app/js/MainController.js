(function() {
  'use strict';

  angular
    .module('App')
    .controller('MainController', MainController);

    MainController.inject = ['$scope', '$location','$anchorScroll', 'dataAssistant'];

    function MainController($scope, $location, $anchorScroll, dataAssistant) {
			$scope.step = 1;
			$scope.user = {};
			$scope.saved ={};
			
			$scope.init = function(){
				console.log('begin init');
				dataAssistant.get('/api/userdata')
				.then(function(data){
					console.log(JSON.stringify(data));
					$scope.saved = data.data;
					$scope.step = $scope.saved.step;					
					$scope.cardnumber = $scope.saved.cardnumber;
					$scope.code = $scope.saved.code;

					$scope.setStep($scope.step);
					
				}).then(function(error){
					console.log(JSON.stringify(error));
				});
			};

			$scope.save = function(){
			   var user = {};
				 user.firstname = $scope.user.firstname;
				 user.lastname = $scope.user.lastname;
				 user.middlename = $scope.user.middlename;
				 user.passport = $scope.user.passport;
				 user.phonenumber = $scope.user.phonenumber;
				 
				 //check data!
				 
				 dataAssistant.post('/api/userdata/save', user)
				 .then(function(data){
					 $scope.saved = user;
					 $scope.setStep(2);
				
           console.log(JSON.stringify(data));
				 })
				 .then(function(error){
						console.log(JSON.stringify(error));
				 });
			};

			$scope.savecard = function(){
				var cardnumber = $scope.user.cardnumber;
				dataAssistant.post('/api/userdata/card/add', {cardnumber: cardnumber})
				.then(function(data){
					$scope.saved.cardnumber = cardnumber;
				  $scope.setStep(4);
					console.log(JSON.stringify(data));
				})
				.then(function(error){
					console.log(JSON.stringify(error));
				})
			}

			$scope.getCard = function(){
				dataAssistant.get('/api/userdata/card')
				.then(function(data){
					$scope.cardnumber = data.cardnumber;
					$scope.setStep(3);					
				})
				.then(function(error){
					console.log(JSON.stringify(error));
				});

			}
				
			$scope.setStep = function(step){
				$scope.step = step;
				$scope.user.step = step;			
				var stephash = `step${step}`;
				console.log();
				$location.hash(stephash);
				$anchorScroll();	
			};						
    }
})();