angular.module('srevento.opcionesController', [])

.controller('OpcionesCtrl', function ($scope, $translate) {

	$scope.cambiaIdioma = function(lang){
	   $translate.use(lang); 
	}

});