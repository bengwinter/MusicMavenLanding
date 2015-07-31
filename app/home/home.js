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

        if ($scope.form.contact.$valid) {
          var contactEmail = $scope.form.contact.email.$viewValue;
      
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
          $scope.contact = { name: '', email: '', message: '', telephone: '', reason: '' };
          $scope.submitMessage = "Thank you for contacting us. Someone will be in touch within the next 5-7 business days."
          $scope.submitMessageSuccess = true;

      
        }
      };
      
      
    });
