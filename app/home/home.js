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

          var data = {email: contactEmail,
          origin: origin};

          var message = {
            to: 'info@musicmaven.co',
            from: contactEmail,
            data : data
           };

         $.post('/contact/send', message, function(res) { })
           .error(function(xhr) { 
            $scope.submitMessage = "There was an error sending your message. Please try again."
            $scope.submitMessageFailure = true;
           });

          $scope.$broadcast('show-errors-reset');
          $scope.signUp = { email: ''};
          $scope.submitMessage = "Thank you for signing up. We will send you keep you informed as we continue our research."
          $scope.submitMessageSuccess = true;

          setTimeout(function(){ 
            $scope.submitMessage = '';
            $scope.submitMessageSuccess = false;
            $scope.submitMessageFailure = false;            
          }, 5000);
          
      
        }
      };
      
      
    });
