angular.module('srevento.mapController', [])

// Controlador para pasar los datos entre el services y routes
.controller('MapCtrl', function($scope, $ionicLoading, $ionicHistory, $ionicPopup, $stateParams, dataService, creaRuta) { 

	// Recoge la id pasada desde el inicio
	$scope.id = $stateParams.id;
	var id = $scope.id

	// Creamos la ruta de dónde recoge el acontecimiento
	var ruta = 'http://srevento.esy.es/api/v1/ac/'+id;

	// Llamamos al servicio para recoger los datos del servidor.
	// En caso de que se hayan podido recoger trabajaremos con las variables que recoga 
	// y posicionaremos el acontecimiento correspondeiente
	dataService.getData(ruta).success(function(data){
		acontecimiento = data;

		// Mostramos al usuario como un toast alertando de que esta cargando la geolocalización
		$ionicLoading.show({
	        template: '<ion-spinner icon="bubbles"></ion-spinner><br/> ¡Obteniendo localización!'
	    });

		// Creamos la variable de latitud y longitud. Si una de las dos está vacia, le mostramos
		// un mensaje al usuario y volvemos hacia atrás
		// En caso contrario rellenamos con las correspondientes del acontecimiento
		if(!acontecimiento.latitud || !acontecimiento.longitud){
			$ionicLoading.hide();
			$ionicPopup.alert({
			    title: '¡No hay coordenadas!',
			    template: 'Este acontecimiento no tiene localización'
			}).then(function(res) {
			    $ionicHistory.goBack();
			})
		} else{
		
			var myLatlng = new google.maps.LatLng(acontecimiento.latitud, acontecimiento.longitud);
			
			// creamos una función que será la de iniciar el mapa
			initMap = function(){
				// recogemos el div del html
				var mapDiv = document.getElementById('map');

				// creamos el objeto de opciones
				var mapOptions = {
		        	center: myLatlng,
		        	zoom: 4,
		        	mapTypeId: google.maps.MapTypeId.ROADMAP
		    	}

				// Creamos un objeto mapa con las variables creadas anteriormente
				var map = new google.maps.Map(mapDiv, mapOptions);

		        // Añadimos un marcador del lugar en el que se encuentra el acontecimineot
		        var marcadorAcontecimiento = new google.maps.Marker({
		            position: new google.maps.LatLng(acontecimiento.latitud, acontecimiento.longitud),
		            map: map,
		            title: acontecimiento.nombre
		        });

		        // Añadimos una ventana de información con el nombre del acontecimiento
		        var infowindowAcontecimiento = new google.maps.InfoWindow({
					content: acontecimiento.nombre
				});

		        // Escuchamos para cuando el usuario haga click en el marcador. Si hace click le añadimos el infowindow
				marcadorAcontecimiento.addListener('click', function() {
					infowindowAcontecimiento.open(map, marcadorAcontecimiento);
				});

			    // Comprobamos que la localización GPS esté activada. En caso de que no esté
			    // llamamos al metodo check authorization de nuestro archivo js.
			    cordova.plugins.diagnostic.isGpsLocationAvailable(function(available){
			    	$ionicLoading.hide();
			        console.log("La localización GPS está " + (available ? "disponible" : "no disponible"));
			        if(!available){
			           checkAuthorization();
			        }else{
			            console.log("La localización GPS ya puede usarse");
			            myLocation();
			        }
			    }, function(error){
			        console.error("Ha ocurrido el siguiente error: "+error);
			    });

			    myLocation = function(){
			        navigator.geolocation.getCurrentPosition(function(pos) {
			        	var myPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

			            map.setCenter(myPos);
			            var miLocalizacion = new google.maps.Marker({
			                position: myPos,
			                map: map,
			                title: "Mi Localización"
			            });

			            var infowindowLocalización = new google.maps.InfoWindow({
							content: "Tu ubicación"
						});

						miLocalizacion.addListener('click', function() {
						infowindowLocalización.open(map, miLocalizacion);
					});

			            creaRuta.ruta(map, myLatlng, myPos, google.maps.TravelMode.DRIVING);

			        });
		    	}
		 
		        $scope.map = map;
		        $ionicLoading.hide();
		    }
		
		    // comprobamos si el documento está listo para usarse
			if(document.readyState === "complete"){
				initMap()
			} else{
				// añadimos un listener para que escuche cuando la ventana se haya cargado
				// cuando funcione inicia el mapa
				google.maps.event.addDomListener(window, 'load', initMap)
			}
		}

	}).error(function(){
		$ionicPopup.alert({
		    title: '¡Error en conexión!',
		    template: 'No se ha podido obtener ubicación'
		}).then(function(res) {
		    $ionicHistory.goBack();
		})
	})
 
});