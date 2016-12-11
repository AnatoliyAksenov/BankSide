(function() {
  'use strict';

  angular
    .module('App')
    .directive('login', login);

  function login(){
    var directive = {
      restrict:'E',
      scope:{
      },
      templateUrl: '/templates/login.html',
      controller: Login,
      bindToController: true
    };

    return directive;
  };
  
  
  Login.$inject = ['$scope', 'dataAssistant'];

  function Login($scope, dataAssistant){
    
  }  
  
})();	