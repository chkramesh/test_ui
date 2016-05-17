'use strict';
foodSenseApp.factory('RecipesService', ['$http', '$q', function($http, $q){
	var urlBase="http://localhost:8080/FoodSenseDemo";
	return {
			
		fetchRecipesList: function(paramData) {					    
				    var config = {
				    	params: paramData,
				    	headers : {'Accept' : 'application/json'}
				    }
				  				    
				    var deferred = $q.defer();
				    return $http.get(urlBase+'/recipeslist',config)
				           .then(function(response) {
				        	   
				            if (response.data.success == true ) {
				            	 return response.data;
				            } else {
	
				            }
			        }, function(errResponse) {
			        	console.error('Error while fetching Recipes');
			        	return deferred.reject(true);
			        });
			        return deferred.promise;
	   },
	   
	   addReceipe: function(recipeObj) {  
		    var deferred = $q.defer();		
	       	return $http({  
	       	       url: urlBase+'/addreceipe',  
	       	       dataType: 'json',  
	       	       method: 'POST', 
	       	       data : {paramData: recipeObj},	
	       	       headers: {"Content-Type": "application/json" }
	       	}).success(function (response) {
	       		    //return response.data;	       		   
	        }, function(errResponse) {
	        	console.error('Error while adding Recipes');
	        	return deferred.reject(true);
	        });
	        return deferred.promise;
     }
	};

}]);

