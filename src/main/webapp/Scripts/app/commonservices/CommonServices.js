'use strict';

var urlBase="http://localhost:8080/FoodSense";
foodSenseApp.factory('EmpApp.CommonServices', ['$resource','$http', '$q', function ($resource, $http, $q) {
	
	return {		
		
	    getCategories: function() {
	    	
	    	alert("CommonServices categories calling !!!....");	
	        return $resource(urlBase + '/listCategory', {}, {
	            query: { method: 'GET', isArray: true }
	        });
	    	
		 },
		 getProductStatusTypes: function() {
	        return $resource(urlBase + '/listProductStatusType', {}, {
	            query: { method: 'GET', isArray: true }
	        });
	    	
		 }
	
      };
}]);
