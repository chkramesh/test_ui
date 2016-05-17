'use strict';
foodSenseApp.factory('AppServices', ['$http', '$q', function($http, $q){

	return {		
			getPageSizeList: function() {
				    return [
			            { value: 5, text: "5" },
			            { value: 10, text: "10" },
			            { value: 25, text: "25" },
			            { value: 50, text: "50" },
			            { value: 100, text: "100" },
			            { value: -1, text: "ALL" }
			          ];
			}
	 }
	}]);
