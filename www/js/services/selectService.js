angular.module("srevento.selectService", [])

.factory('selectBD', function($cordovaSQLite) {

   return {
      getData: function(id) {
        var existe;

		db = $cordovaSQLite.openDB({ name: "srevento.db", location: 1 });

		var querySelect = "SELECT id, nombre FROM acontecimiento WHERE id = ?";

		$cordovaSQLite.execute(db, querySelect, [id]).then(function(res, existe){
			if (res.rows.length > 0) existe = true;
			else existe = false;
		});

         return existe;
      }
   }

});