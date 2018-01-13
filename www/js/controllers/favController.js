angular.module('srevento.favoritosController', [])

.controller('FavCtrl', function ($scope, $ionicPopup, $cordovaSQLite) {

	var db = null;
	$scope.resultado = [];

	document.addEventListener('deviceready', function() {
		db = $cordovaSQLite.openDB({ name: "srevento.db", location: 1 });

		var querySelect = "SELECT id, nombre, organizador, descripcion, localidad, provincia FROM acontecimiento";

		$cordovaSQLite.execute(db, querySelect).then(function(res){
			if (res.rows.length < 1){
				$ionicPopup.alert({
					title: 'No hay acontecimientos',
					template: 'No tienes ningún acontecimiento añadido a favoritos'
				});
	    	} else{ 
	    		// recorremos las columnas que nos devuelve res y añadimos los datos a la variable
		    	// $scope.resultado, que será un array
		    	for(var i = 0; i < res.rows.length; i++){
		    		$scope.resultado.push(res.rows.item(i));
		    	}
	    	}
		});
  	});

});