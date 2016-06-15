'use strict';

angular
  .module('baejaVu')
    .controller('HomeCtrl', function ($scope, $rootScope, TextLookupService, DataService, $sce, $window) {

      var initializePage = function() {
        $scope.form = {};

        if ($window.innerWidth < 500) {
          $scope.iframeString = '<iframe width="300" height="168.75" src="//www.youtube.com/embed/WtKUYpmEAfs" frameborder="0" allowfullscreen></iframe>'
        } else {
          $scope.iframeString = '<iframe width="560" height="315" src="//www.youtube.com/embed/WtKUYpmEAfs" frameborder="0" allowfullscreen></iframe>'
        }

        $scope.youtube = $sce.trustAsHtml($scope.iframeString);  
      }

      

      $scope.sendContactForm = function() {
        $scope.$broadcast('show-errors-check-validity');

        var formEl = $('#baeja-vu-contact-form');
        var formData = formEl.serialize();
        var submitButton = $('input[type=submit]', formEl);
          // formEl.find('button').click(function(e) {
          //   e.preventDefault();
          //   // e.stopPropagation();

          //   var formData = form.serialize();
          //   $.post('http://thebigflamingo.com/contact/send', formData, function(response) { 
          //     console.log(response); 
          //     $scope.$broadcast('show-errors-reset');
          //     $scope.contact = { name: '', email: '', message: ''};
          //     $scope.submitMessage = "Thank you for reaching out."
          //     $scope.submitMessageSuccess = true;
                

          //     setTimeout(function(){ 
          //       $scope.submitMessage = '';
          //       $scope.submitMessageSuccess = false;
          //       $scope.submitMessageFailure = false;            
          //     }, 2500);
          //   });
          // });
        // var formEl = $('#baeja-vu-contact-form');
        
        // var formData = formEl.serialize();

        if ($scope.form.contact.$valid) {
          $.ajax({
            type: 'POST',
            url: 'http://thebigflamingo.com/contact/send',
            accept: {
              javascript: 'application/javascript'
            },
            data: formData,
            beforeSend: function() {
              submitButton.prop('disabled', 'disabled');
            }
          }).done(function(data) {
            submitButton.prop('disabled', false);
          });

            $scope.$broadcast('show-errors-reset');
            $scope.contact = { name: '', email: '', message: ''};
            $scope.submitMessage = "Thank you for reaching out."
            $scope.submitMessageSuccess = true;
        }
            

          setTimeout(function(){ 
            $scope.submitMessage = '';
            $scope.submitMessageSuccess = false;
            $scope.submitMessageFailure = false;            
          }, 2500);
     
      };
      
      initializePage();
    });
