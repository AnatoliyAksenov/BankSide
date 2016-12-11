(function() {
  'use strict';

  angular
    .module('App')
    .directive('profile', profile);

  function profile(){
    var directive = {
      restrict:'E',
      scope:{
      },
      templateUrl: '/templates/profile.html',
      controller: Profile,
      bindToController: true
    };

    return directive;
  }; 
  
  Profile.$inject = ['$scope', 'dataAssistant'];

  function Profile($scope, dataAssistant){
    $scope.profile = $scope.$parent.user;
    console.log($scope.$parent.user);
  }  
  
})();	