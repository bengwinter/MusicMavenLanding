'use strict';

angular
  .module('musicMaven')
    .controller('HomeCtrl', function ($scope, $rootScope, TextLookupService, DataService) {
      $scope.form = {};
      $scope.submitMessage = "";

      TextLookupService.getText('home.json').success(function(data){       
        $scope.text = data;
      });

      $scope.sendSignUpForm = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.form.signUp.$valid) {
          var contactEmail = $scope.form.signUp.email.$viewValue;
      
          var origin = location.origin;

          var data = {email: contactEmail, origin: origin};
          
          DataService.sendContactForm(data).success(function(data){
            if (data["success"]) { 

            } else {
  
            }
            
            
          });
        };
      };
    
      $scope.$on('CONTACT_FORM_SUCCESS', function(response) {
        $scope.$broadcast('show-errors-reset');
        $scope.submitMessage = "Thank you for contacting us. Someone will be in touch within the next 24-48 hours."
        $scope.submitMessageSuccess = true;
        $scope.signUp = { name: '', email: '', message: '', telephone: '' };
      });

      $scope.$on('CONTACT_FORM_ERROR', function(response) {
        $scope.submitMessage = "There was an error submitting your message. Please try again."
        $scope.submitMessageSuccess = false;
      });
      
      
    });
