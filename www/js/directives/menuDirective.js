angular.module('srevento.menuDirective', [])

// Directiva de tipo atibuto para el menú. 
.directive('menuDirective', function(){

    return {
      	restrict: 'A',
      	templateUrl: "templates/directives/menu-directive.html",
    }

});