// SrEvento Ionic

angular.module('srevento', ['ionic', 'ionic-material', 'ngCordova', 'pascalprecht.translate',
  // Controllers
  'srevento.mainController', 
  'srevento.inicioController',
  'srevento.mapController',
  'srevento.camaraController',
  'srevento.opcionesController',
  'srevento.favoritosController',
  'srevento.detallesController',
  'srevento.contactosController',
  // Directivas 
  'srevento.menuDirective',
  'srevento.cardDirective',
  // Services
  'srevento.routes', 
  'srevento.loadDataService',
  'srevento.creaRuta',
  'srevento.camaraService',
  'srevento.selectService'
  ])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // ======= cordova-plugin-network-information - comprobamos que este activado internet =====
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
    // ====== Network-Information end =====

    // === Cordova Status Bar Plugin - Cambiar el color de la barra de status
    if (window.StatusBar) {
      if (ionic.Platform.isAndroid()) {
        StatusBar.backgroundColorByHexString("#D34650");
      } else {
        StatusBar.styleLightContent();
      }
    } 

    // ====== Admob - mostrar publicidad ==
      initAd();

  // ====== One Signal PUSH =

  // -- Descomentar para modo Debug
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("6b00c6b1-8212-415a-8897-8c67c2a7049b")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

    // === One Signal end =====

  });
});