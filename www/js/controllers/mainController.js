angular.module('srevento.mainController', [])

// Controlador para pasar los datos entre el services y routes
.controller('MainCtrl', function($rootScope, $scope, $ionicPopup, dataService) { 

	// Creamos la ruta de la portada
	var ruta1 = 'http://srevento.esy.es/api/v1/acontecimientos';

	// Llama al método get Data del servicio para obtener los datos mediante una ruta y los
	// almacena en una variable. Muestra un error en caso de que no se haya podido realizar
	dataService.getData(ruta1)
		.success(function(data){
        	$scope.datos = data;
     	})
     	.error(function(error){
	     	$ionicPopup.confirm({
	          title: 'Error en datos',
	          content: 'Algo ha fallado al cargar: ' + error
	        });
		});

});