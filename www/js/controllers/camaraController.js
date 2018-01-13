angular.module('srevento.camaraController', [])

.controller('CamaraCtrl', function($scope, $ionicPopup, camara) {

    // Método tomarFoto, se activará al pulsar el botón de la vista. 
	$scope.tomarFoto = function(){
		var opciones = {
			// Calidad de la foto 100
		  quality: 100,
		  // tipo de guardado, como archivo
		  destinationType: Camera.DestinationType.FILE_URI,
		  sourceType: Camera.PictureSourceType.CAMERA,
		  encodingType: Camera.EncodingType.JPEG,
		  cameraDirection: 1,
		  saveToPhotoAlbum: true
		};

		camara.getFoto(opciones).then(function(imageData) {
			// Recuperamos los datos en variable picture para mostrarla en la vista
			$scope.picture = imageData;
	  	}, function (err) {
	  		console.log("Algo ha fallado: " + err);
	  	});
   }
   
   $scope.getFoto = function () {
      var opciones = {
         quality: 100,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 0
      };

      camara.getFoto(opciones).then(function(imageData) {
         $scope.picture = imageData;
      }, function(err) {
         console.log(err);
      });
   };

})