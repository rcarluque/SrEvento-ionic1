angular.module('srevento.inicioController', [])

.controller('InicioCtrl', function ($scope, $cordovaSQLite, $cordovaSocialSharing, ionicMaterialInk) {

	// Activa los efectos aplicados
    ionicMaterialInk.displayEffect();

    // CComprobamos que la acción se realice cuando esté listo el dispositivo
    document.addEventListener('deviceready', function() {
        db = $cordovaSQLite.openDB({ name: "srevento.db", location: 1 });

        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS acontecimiento (id integer primary key, nombre text, organizador text, "+ 
                "descripcion text, tipo integer, inicio datetime, fin datetime, direccion text, localidad text, cod_postal integer, "+ 
                "provincia text, longitud float, latitud float, telefono integer, "+ 
                "email text, web text, facebook text, twitter text, instagram text)");
    });
    
});