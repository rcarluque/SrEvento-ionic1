angular.module('srevento.routes', [])

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MainCtrl'
  })

  .state('app.inicio', {
    url: '/inicio',
    views: {
      'menuContent': {
        templateUrl: 'templates/inicio.html',
        controller: 'InicioCtrl'
      }
    }
  })

  .state('app.mapa', {
    cache: false,
    url: '/inicio/map/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/mapa.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('app.detalles', {
    cache: false,
    url: '/inicio/detalles/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/detalles.html',
        controller: 'DetallesCtrl'
      }
    }
  })

  .state('app.foto', {
    url: '/foto',
    views: {
      'menuContent': {
        templateUrl: 'templates/camara.html',
        controller: 'CamaraCtrl'
      }
    }
  })

  .state('app.favoritos', {
    // Con cache false le indicamos que recarge la vista cada vez que entre.
    cache: false,
    url: '/favoritos',
    views: {
      'menuContent': {
        templateUrl: 'templates/favoritos.html',
        controller: 'FavCtrl'
      }
    }
  })

  .state('app.Llamada', {
    url: '/llamada',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactos.html',
        controller: 'ContactosCtrl'
      }
    }
  })

  .state('app.opciones', {
    url: '/opciones',
    views: {
      'menuContent': {
        templateUrl: 'templates/opciones.html',
        controller: 'OpcionesCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');

  $translateProvider
       .useStaticFilesLoader({
          prefix: 'locales/',
          suffix: '.json'
        })
        .registerAvailableLanguageKeys(['en', 'es', 'fr'], {
          'en' : 'en', 'es' : 'es', 'fr' : 'fr'
        })
        .preferredLanguage('es')

});
