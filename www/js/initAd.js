function initAd(){
	var admobid = "ca-app-pub-6242161406310328~5624447694";
        // Selecciona el ID de anuncio correcto según la plataforma
        if( /(android)/i.test(navigator.userAgent) ) { 
          admobid = { // Para Android
            banner: 'ca-app-pub-6242161406310328/7101180894',
            interstitial: 'ca-app-pub-6242161406310328/8438313293'
          };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
          admobid = { // Para iOS
            banner: 'banner-id',
            interstitial: 'interstitial-id'
          };
        } else {
          admobid = { // Para Windows Phone
            banner: 'banner-id',
            interstitial: 'interstitial-id'
          };
        }

      if(window.AdMob) {
        AdMob.createBanner({
          adId: admobid.banner, 
          position: AdMob.AD_POSITION.BOTTOM_CENTER, 
          isTesting: true,
          autoShow: true
        });
      }

      window.AdMob.prepareInterstitial({
          adId: admobid.interstitial, 
          isTesting: true,
          // Autoshow a true quiere decir que se mostrará automaticamente al empezar la aplicación
          // Autoshow a false se selecciona para mostarlo cuando nosotros deseemos
          // NOTA: Está puesto a true porque google no me deja mostrar más de una vez el interticial
          autoShow: false
        });
      // El insterticial se dispara cada minuto
      window.AdMob.showInterstitial();
      setInterval(window.AdMob.showInterstitial, 1*60*1000)
}