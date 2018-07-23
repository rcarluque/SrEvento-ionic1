# SrEvento-ionic1
Aplicación desarrollada en Ionic 1 por Rafael Carmona Luque. Muestra los eventos y sus detalles, recogidos desde un servidor REST.

Instrucciones de plugins y librerías:

################### Ionic Material - (Librería Material Desing para Ionic)

# Paso 1: Intalar usando bower.
	```si no está instalado
	npm install -g bower

```shell
 cd /ruta/proyecto
 bower install ionic-material
```
 
# Paso 2: Añadir la fuente robotodraft y los css
 
```html 
	<link href='https://fonts.googleapis.com/css?family=RobotoDraft:400,500,700,400italic' rel='stylesheet' type='text/css'>
    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
    <link href="lib/ionic-material/ionic.material.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <script src="lib/ionic/js/ionic.bundle.js"></script>
    <script src="lib/ionic-material/ionic.material.min.js"></script>
```

# Paso 3: Inyectar el modulo
```javascript
    var app = angular.module('NOMBRE APP', ['ionic', 'ionic-material']);
```

# Paso 4: Dónde sea apropiado hacer llamada a *ionicMaterialInk* o *ionicMaterialMotion*
```javascript
	.controller('InicioCtrl', function ($scope, $stateParams, ionicMaterialInk) {
		//ionic.material.ink.displayEffect();
		ionicMaterialInk.displayEffect();
	});
```

################### ng-Cordova

```shell
	 bower install ngCordova
```

# Añadir al HTML

```html
	<script src="lib/ngCordova/dist/ng-cordova.js"></script>
```

# Inyectar el modulo a la aplicación

```javascript
	angular.module('myApp', ['ngCordova'])
```

################### GeoLocation Cordova Plugin, lo usaremos para el mapa

# Intalar el plugin
ionic plugin add cordova-plugin-geolocation

# Para usarlo, sólo tenemos que hacer la llamada en el javascript a la geolocation

```javascript
	navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "My Location"
        });
    });
```

################### Diagnostic Cordova plugin, lo usaremos para chequear el permiso de geolocalización

```shell
	ionic plugin add cordova.plugins.diagnostic
``

Añadir en el controlador (modificando a nuestro gusto:
```javascript
	cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
			console.log("Location is " + (enabled ? "enabled" : "disabled"));},
		function(error){ 
		   console.error("The following error occurred:"+error);
		});
```

################### Resquest Location Cordova Plugin. Para activar la localización

```shell
	ionic plugin add cordova-plugin-request-location-accuracy
```

################### Cordova Network Information

```shell
	ionic plugin add cordova-plugin-network-information
```

```javascript
	cordova.plugins.locationAccuracy.request(function (success){
	});
```

Añadir al app.js
```javascript
	if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: "Internet Desconectado",
            content: "La conexión está desactivada en tu teléfono."
          }).then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
          });
      }
    }
```

################### Cordova Camera & Cordova File

Plugin para manejar la camara. También usaremos el plugin file para guardar el archivo que cree la camara.

```shell
	ionic plugin add cordova-plugin-camera
	ionic plugin add cordova-plugin-file
```

Creamos un servicio para llamar a la cámara desde un controlador
```javascript
	.factory('camara', function($q) {

	   return {
		  getFoto: function(options) {
			 var q = $q.defer();

			 navigator.camera.getPicture(function(result) {
				q.resolve(result);
			 }, function(err) {
				q.reject(err);
			 }, options);

			 return q.promise;
		  }
	   }

	});
```

Tras esto configuramos el controlador con un método para cuando pulsemos un botón
nos aparezca la cámara y se guarde el archivo en la cámara.

# Añadir el servicio 
```javascript
	.controller('CamaraCtrl', function($scope, $ionicPopup, camara, ionicMaterialInk) {
```

# El código
```javascript
// Método tomarFoto, se activará al pulsar el botón de la vista. 
	$scope.tomarFoto = function(){
		var opciones = {
		  quality: 100,
		  destinationType: Camera.DestinationType.FILE_URI,
		  sourceType: Camera.PictureSourceType.CAMERA,
		  encodingType: Camera.EncodingType.JPEG,
		  cameraDirection: 1,
		  saveToPhotoAlbum: true
		};

		camara.getFoto(opciones).then(function(imageData) {
			$scope.picture = imageData;
	  	}, function (err) {
			// error code
	  	});
   }
```

################### Cordova Admob Pro

Instalar desde shell
```shell
	ionic plugin add cordova-plugin-admobpro
```

Ahora añadimos el siguiente código a $ionicPlatform.ready() en el archivo app.js

```javascript
    // ====== Admob - mostrar publicidad ==
      var admobid = {};
        // Selecciona el ID de anuncio correcto según la plataforma
        if( /(android)/i.test(navigator.userAgent) ) { 
          admobid = { // Para Android
            banner: 'your-id-banner',
            interstitial: 'your-id-interstitial'
          };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
          admobid = { // Para iOS
            banner: 'your-id-banner',
            interstitial: 'your-id-interstitial'
          };
        } else {
          admobid = { // Para Windows Phone
            banner: 'your-id-banner',
            interstitial: 'your-id-interstitial'
          };
        }

      if(window.AdMob) AdMob.createBanner( {
        adId: admobid.banner, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER, 
		isTesting: true,
        autoShow: true
      });
  // ====== Admob end =======
```

################### One Signal para notificaciones Push

```shell
	ionic plugin add onesignal-cordova-plugin
```

# Añadir al app.js
```javascript
	var notificationOpenedCallback = function(jsonData) {
		console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
	};

  window.plugins.OneSignal
    .startInit("6b00c6b1-8212-415a-8897-8c67c2a7049b")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
```

# Añadir al controlador
```javascript
	if (window.AdMob) AdMob.showInterstitial();
```

################### SQLite Database

```shell
	ionic plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git
```

# En el controlador llamar a las funciones:

```javascript

```

################### Cordova Statusbar. Cambia el color de la barra de estado.

```shell
	ionic plugin add https://github.com/apache/cordova-plugin-statusbar.git
```

Añadir al app.js platform.ready

```javascript
	if (window.StatusBar) {
		if (ionic.Platform.isAndroid()) {
		  StatusBar.backgroundColorByHexString("#608628");
		} else {
		  StatusBar.styleLightContent();
		}
	}
```

################### Cordova Contacs. Recoge los contactos de la BBDD.

```shell
	ionic plugin add cordova-plugin-contacts
```

Añadir en el controlador:

```javascript
	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {

	   // when using the plugin:
	   // you can put it within your angularjs-controllers 
	   // where it will be executed and onSuccess-callback is called.
	   var options = new ContactFindOptions();
	   options.filter = "";
	   options.multiple=true; 
	   var fields = ["displayName", "name"];

	   navigator.contacts.find(fields, onSuccess, onError, options);

	}

	// within this function you have to assign contacts to a model
	function onSuccess(contacts) {
	   $scope.contacts = contacts;
	}


	function onError(contactError) {
	   alert('onError!');
	}
```

- NOTA, como mostrar los números de telefono:
<div ng-repeat ="phn in con.phoneNumbers"><span>{{phn.type}}:</span> {{phn.value}}</p>

################### Cordova Share - Para compartir en redes sociales. Sólo he configurado el whatsapp de prueba

```shell
	ionic plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
```

Añadir al controlador la línea para compartir:

```javascript
	$scope.compartirWhats = function(mensaje, image, link) {
				$cordovaSocialSharing.canShareVia("whatsapp", mensaje, image, link).then(function(result) {
				    $cordovaSocialSharing.shareViaWhatsApp(mensaje, image, link);
				}, function(error) {
				    alert("No se puede compartir en whatsapp");
				});
			}
```

################### Cordova Vibration

```shell
	ionic plugin add cordova-plugin-vibration
```

Añadir al controlador: 

```javascript
	module.controller('MyCtrl', function($scope, $cordovaVibration) {

	  // Vibrate 100ms
	  $cordovaVibration.vibrate(100);

	});
```

################### Angular Translation.

# Descargar desde la web angular-translation.js

- https://cdn.rawgit.com/angular-translate/bower-angular-translate/2.5.0/angular-translate.js

y guardar en nuestra carpeta /js

Importar al html
```html
	<script src="js/angular-translate.js"></script>
```

Agregar el modulo al app.js
```javascript
	'pascalprecht.translate'
```

Agregar al .config el la funcion $translateProvider
```javascript
	  $translateProvider.translations('en', en_tran);
  
	  $translateProvider.translations('sp', sp_tran);
	  
	  $translateProvider.preferredLanguage('en');
```



