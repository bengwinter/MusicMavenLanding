'use strict';

angular.module('baejaVu').factory('DataService',
  function($http, $rootScope, $location) {
    var Service = function() {};

    function sendData(url, data) {
      var request = {
        success: function() {},
        error: function() {
          console.log("Error While Getting Data");
          return null;
        }
      }; 

      if (data === undefined) {
        data = {};
      }

      if (location.hostname.indexOf('www.') !== -1) {
        data.origin = location.hostname.replace('www.','');
      } else {
        data.origin = location.hostname;  
      }

      if (url) {
        request = $http({
          method  : "POST",
          url     : url,
          data    : $.param(data),
          headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        }).success(function(data) {
            $rootScope.$broadcast('CONTACT_FORM_SUCCESS');
          })
          .error(
            function(data) {
              $rootScope.$broadcast('CONTACT_FORM_ERROR');
              console.log("Error While Getting Data");
              return null;
            });
      }
      return request;
    }

    Service.sendContactForm = function(data) {
      var url = SEND_CONTACT_FORM;
      return sendData(url, data);
    };


    return Service;
  });