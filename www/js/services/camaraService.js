angular.module("srevento.camaraService", [])

.factory('camara', function($q) {

   return {
      getFoto: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

});