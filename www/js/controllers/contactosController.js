angular.module('srevento.contactosController', [])

.controller('ContactosCtrl', function ($scope, $cordovaContacts) {

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

});