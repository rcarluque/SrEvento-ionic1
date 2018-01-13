angular.module('srevento.detallesController', [])

.controller('DetallesCtrl', function ($scope, $stateParams, $ionicPopup, $cordovaSQLite, $cordovaVibration, ionicMaterialMotion, dataService) {

	// Activa los efectos aplicados
	ionicMaterialMotion.fadeSlideIn();

	var id = $stateParams.id;

	// Creamos una función cambiará el color del icono a amarillo
	colorGuardado = function() {
	    $scope.color = {
	      'color': 'yellow'
	    };
	};

	colorNo = function() {
    	$scope.color = {
      		'color': 'grey'
    	};
  	};

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
		// Hacemos un select al recoger los datos para comprobar si existe y elegir el color del icono favoritos
		db = $cordovaSQLite.openDB({ name: "srevento.db", location: 1 });
		var querySelect = "SELECT id, nombre, organizador, descripcion, tipo, inicio, fin, direccion, localidad, "+ 
			"cod_postal, provincia, longitud, latitud, telefono, email, web, facebook, twitter, instagram FROM acontecimiento WHERE id = ?";
		$cordovaSQLite.execute(db, querySelect, [id])
			.then(function(res){
				if (res.rows.length > 0){
					colorGuardado();
					$scope.datos = res.rows.item(0);
				} else {
					colorNo();
					loadFromRest();
				}
		});
	}

	/* Función que recoge los datos desde un servidor REST en caso de que no exista el acontecimiento
		cliqueado en la base de datos */
	loadFromRest = function(){
		// Creamos la ruta de la portada
		var ruta = 'http://srevento.esy.es/api/v1/ac/'+id;

		dataService.getData(ruta).success(function(data){
			$scope.datos = data;		
	    });
	};

	// Función insertar para cuando se hace click en el botón de favoritos
	$scope.insertar = function(id, nombre, organizador, descripcion, tipo, inicio, fin, direccion, localidad, cod_postal, provincia, longitud, latitud, telefono, email, web, facebook, twitter, instagram) {
		db = $cordovaSQLite.openDB({ name: "srevento.db", location: 1 });
		// Hacemos otravez la consulta para comprobar cada vez que se haga click en el botón si el acontecimiento existe en la BBDD
		var querySelect = "SELECT id, nombre FROM acontecimiento WHERE id = ?";

		$cordovaSQLite.execute(db, querySelect, [id])
			.then(function(res){
				if (res.rows.length > 0){
					// Si existe lo borramos
				    var queryDel = "DELETE FROM acontecimiento WHERE id = ?";

				    $cordovaSQLite.execute(db, queryDel, [id]).then(function(res){
				    	console.log("Id borrada: " + res.insertId);
						console.log("Columnas afectadas: " + res.rowsAffected);
						// Cambiamos el color del icono
						colorNo();  
				    });
				} else{
					// Si no existe lo insertamos
					var queryInsert = "INSERT INTO acontecimiento (id, nombre, organizador, descripcion, tipo, inicio, fin, direccion, localidad, "+ 
						"cod_postal, provincia, longitud, latitud, telefono, email, web, facebook, twitter, instagram) "+ 
			    		"VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

			    	$cordovaSQLite.execute(db, queryInsert, [id, nombre, organizador, descripcion, tipo, inicio, fin, direccion, 
			    		localidad, cod_postal, provincia, longitud, latitud, telefono, email, web, facebook, twitter, instagram])
			    		.then(function(res) {
			    			// Código para que vibre 100ms
			    			$cordovaVibration.vibrate(100);
			    			// Cambiamos el color del icono
			    			colorGuardado();
							console.log("ID insertada -> " + res.insertId);
						}, function (err) {
						    console.error(err);
						});

				}
			});
	};

});