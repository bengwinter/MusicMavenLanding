'use strict';

angular.module('baejaVu').factory('TextLookupService',
  function($http, $rootScope) {
    var Service = function() {};

    function getJsonFile(filename) {
      var request = {
        success: function() {},
        error: function() {
          console.log("Error While Retrieving JSON File: " + filename);
          return null;
        }
      };

      if (filename) {
        request = $http
          .get('json/' + filename)
          .success(function(data) {
            // return data;
          })
          .error(
            function(data) {
              console.log("Error While Retrieving JSON File: " + filename);
              return null;
            });
      }
      return request;
    }


    Service.getText = function(filename) {
      return getJsonFile(filename);
    };

    return Service;
  });