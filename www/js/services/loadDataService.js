angular.module('srevento.loadDataService', [])

.service('dataService', function ($http) {

	// Creamos un método getDate que llama a la función http. Recibe una ruta desde el controlador.
    this.getData = function (ruta) {
        return $http.get(String(ruta));
    }

});