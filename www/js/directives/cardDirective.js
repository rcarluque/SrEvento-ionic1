angular.module('srevento.cardDirective', [])

.directive('cardDirective', function(){

    return {
      	restrict: 'E',
      	templateUrl: "templates/directives/card-directive.html",
		// Con el scope recogemos las variables que se le pasan desde la vista principal
    	scope: {
    		id: '@',
			nombre: '@',
			organizador: '@',
			descripcion: '@',
			localidad: '@',
			provincia: '@'
		},
		controller: function($scope, ionicMaterialInk){
			ionicMaterialInk.displayEffect();

		    $scope.compartirWhats = function(mensaje, image, link) {
				$cordovaSocialSharing.canShareVia("whatsapp", mensaje, image, link).then(function(result) {
				    $cordovaSocialSharing.shareViaWhatsApp(mensaje, image, link);
				}, function(error) {
				    alert("Error al compartir en Whastapp: " + error);
				});
			}
		}
    }

});