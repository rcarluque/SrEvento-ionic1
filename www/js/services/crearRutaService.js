angular.module("srevento.creaRuta", [])

.factory("creaRuta", function() {

  //google.maps.TravelMode.DRIVING
  //google.maps.TravelMode.BICYCLING
  //google.maps.TravelMode.TRANSIT
  //google.maps.TravelMode.WALKING
  var crear = function(map, origen, destino, modo_viaje){
      var waypts = [];

      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });

      waypts.push({
        location: origen,
        stopover:true
      });

      var request = {
        origin: origen,
        destination: destino,
        waypoints: waypts,
        optimizeWaypoints: true,
        // modo de viaje que se ha de asignar
        travelMode: modo_viaje
      };

      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          // Estilos para la linea
          polylineOptions = {
            strokeColor: '#130C9C',
            strokeWeight: '2'
          }
          directionsDisplay.setOptions({
            polylineOptions: polylineOptions
          });
          directionsDisplay.setDirections(response);
          }
      });

      directionsDisplay.setMap(map);
  };
  return {
    ruta: crear
  };
});