
var recipesController = angular.module("RecipesController", ['ngTable']);
recipesController.controller("RecipesListController", ['$scope', '$http', '$filter', 'ngTableParams', 'exDialog', 'RecipesService','AppServices',
	                                                       function ($scope, $http, $filter, ngTableParams, exDialog, recipesService, appServices) {
   
     $scope.model = {};
     $scope.model.receipeList = {};  
   
     var pageSizeList = appServices.getPageSizeList();   
     //Default selected page size.
     var pageSizeSelectedDef = 5;

     //Paging and sorting paramters for fetching data.
     var pageIndex = 0;
     var pageSize = 5;

     //ng-table parameters and settings.
     $scope.tableParams = undefined;

     //Set search flag for bypassing non-search parameter settings.
     var nonPagerCall = false;
     //Set re-search flag for bypassing extra parameter change triggered call.
     var bypassGetData = false;
     //reloadType: 'rego' or "", 'refresh', 'add'.
     var reloadType = "";  
     
     //Called from clicking search Go button. The getData will be called from any change of params.
     var loadRecipeList = function () {
         //Set default values.
         pageIndex = 0;
         pageSize = pageSizeSelectedDef;

         //Set flag for calling from non-paging components.
         nonPagerCall = true;
         
         //Set initially ng-table parameters and this will be called first time.
         $scope.tableParams = new ngTableParams({
             page: pageIndex + 1, // Page number
             count: pageSize,     // Count per page             
         }, {
             defaultSort: 'asc',
             total: 0,
             countOptions: pageSizeList,
             countSelected: pageSize,
             //getData will also automatically be called from ng-table.js whenever params is changed.
             getData: getDataForGrid
         });
     };
   
     var getDataForGrid = function ($defer, params) {
         if (!bypassGetData) {
             //Reset param items when data refresh trigged by pager/sorter. 
             if (!nonPagerCall) {                         
                 pageIndex = params.page() - 1;
                 //Go to page #1 if change page size. 
                 if (pageSize != params.count()) {
                     pageSize = params.count();
                     params.page(1);
                 }                
             }
             else {
                 nonPagerCall = false;
             }
             
             $scope.errorMessage = undefined;
             //Below are called by all modes.          
        	 var paramData = {limit : params.count(), page : params.page(), start : (params.count()*params.page()-params.count()) };
	    	  
	    	 //Get data from database.		    	 	   
	    	 var promise = recipesService.fetchRecipesList(paramData);
	    	   
	    	 promise.then(
    			   function(data) {  			    	   				    
  	                 $scope.model.receipeList = data.rows;
  	                 
                     //Update table params.	                     	
                     if (reloadType == "add") {
                         params.total($scope.model.receipeList.length);
                         //Set for pager display.
                         params.settings().addNewLoad = true;
                     }
                     else {	                            
                         params.total(data.total);
                         params.settings().addNewLoad = false;
                     }

                     //Set start and end page numbers for page and item info display.
                     if (pageIndex == 0) {
                         params.settings().startItemNumber = 1;
                     }
                     else {
                         params.settings().startItemNumber = pageIndex * params.settings().countSelected + 1;
                     }
                  
                     params.settings().endItemNumber = params.settings().startItemNumber + params.count() - 1;  
                     $defer.resolve($scope.model.receipeList);	                        
                     
                     //Refresh and populate checkboxes.items array.
                     $scope.checkboxes.items = [];
                     $scope.checkboxes.topChecked = false;
                     for (var i = 0; i < $scope.model.receipeList.length; i++) {
                         $scope.checkboxes.items[i] = false;
                     }
                     $scope.hasEditItemChecked = false;

                     //Show table.
                     $scope.showRecipeList = true;
  			    },
				function(errResponse){
					console.error('Error while fetching ContactList');
					alert("Error while fetching ContactList");
  				}
	  		 );
		    	
         }
        
     };
     
     loadRecipeList();    
  
     $scope.dateOptions = {
         formatYear: 'yyyy',
         startingDay: 1,
         showWeeks: 'false'
     };
     $scope.format = 'MM/dd/yyyy';

     //Set default object for checkboxes in table including items array.
     $scope.checkboxes = {
         'topChecked': false,        
         items: []
     };    
     var hasUnChecked = function () {
         //Loop to get flag if any item box unchecked.
         var rtn = false;
         for (var i = 0; i < $scope.checkboxes.items.length; i++) {
             if (!$scope.checkboxes.items[i]) {
                 rtn = true;
                 break;
             }
         }
         return rtn;
     };
     $scope.topCheckboxChange = function () {        
         angular.forEach($scope.checkboxes.items, function (item, index) {
             $scope.checkboxes.items[index] = $scope.checkboxes.topChecked;
         });
         $scope.hasEditItemChecked = $scope.checkboxes.topChecked;
     };
     $scope.listCheckboxChange = function () {
         $scope.checkboxes.topChecked = !hasUnChecked();
         
         //Set flag for disabling/enabing buttons related to checkbox status.
         $scope.hasEditItemChecked = false;
         for (var i = 0; i < $scope.checkboxes.items.length; i++) {
             if ($scope.checkboxes.items[i]) {
                 $scope.hasEditItemChecked = true;
                 break;
             }
         }
     };
     
     //For communicating with ng-table scope through prototype inheritance.  
     $scope.paging = {};
     //For caching and passing back recipe id array.
     $scope.newRecipeIds = [];     
  
     //Called from clicking Recipe Name link in table.
     $scope.paging.openRecipeForm = function (id) {
         $scope.recipeId = undefined;
         if (id != undefined) {
             $scope.recipeId = id;
         }
         exDialog.openPrime({
             scope: $scope,
             template: 'Pages/recipeform.html',
             controller: 'recipesController',
             width: '450px',
             //height: '650px',
             beforeCloseCallback: refreshGrid,
             closeByXButton: true,
             closeByClickOutside: false,
             closeByEscKey: false
         });
     };

     //Callback function to refresh the table. 
     var refreshGrid = function () {        
         reloadType = "add";
         loadRecipeList();
     };
     
 }]
);

recipesController.controller("recipesController", ['$scope', '$rootScope', '$timeout', '$http', '$filter', 'ngTableParams', 'exDialog', 'RecipesService','AppServices','EmpApp.CommonServices',
                                                   function ($scope, $rootScope, $timeout, $http, $filter, ngTableParams, exDialog, recipesService, appServices, commonServices) {	

	$scope.model.receipe = {};	
	var maxAddPerLoad = 2;
	
	//For input fields on draggable dialog,
	$scope.setDrag = function (flag) {
	$rootScope.noDrag = flag;
	}	
	
	if ($scope.recipeId == undefined) {
		$scope.recipeDialogTitle = "Add Recipes";
	}
	else {	
		$scope.recipeDialogTitle = "Update Recipes";
	}
	
	$scope.saveRecipe = function (isValid) {	
		// check to make sure the form is completely valid
		if (!isValid) {
		    exDialog.openMessage({
		        scope: $scope,
		        title: "Error",
		        icon: "error",
		        message: "Invalid data entry.",
		        closeAllDialogs: true
		    });
		    return false;
		}
		
		var title, message;
		if ($scope.model.receipe.recipeId > 0) {
		    title = "Update Confirmation";
		    message = "Are you sure to update the Recipe?";
		}
		else {
		    title = "Add Confirmation";
		    message = "Are you sure to add the Recipe?";
		}
		
		exDialog.openConfirm({
		    scope: $scope,
		    title: title,
		    message: message
		    //keepOpenForAction: true
		}).then(function (value) {
		    //Save Recipe to db.		
		
		    if ($scope.model.receipe.recipeId > 0) {
		    	// for Recipe update    	
	        }
	        else {   	
	    	  // for Recipe add to database.
	    	   var promise = recipesService.addReceipe($scope.model.receipe);	    	   
	    	   promise.then(
	    			   function(data) {  			    	
	    				   //Reset form.
	    		            $scope.recipeForm.$setPristine();
	
	    		            //Adding recipeId to array.
	    		            $scope.newRecipeIds.push(data.recipeId);
	
	    		            if ($scope.newRecipeIds.length < maxAddPerLoad) {
	    		                //Continue to add Recipe items.
	    		                exDialog.openConfirm({
	    		                    scope: $scope,
	    		                    message: "The new recipe has successfully been added. \n\nWould you like to add another?",
	    		                    messageAddClass: 'ng-with-newlines'
	    		                    //closeImmediateParentByAction: true
	    		                }).then(function (value) {
	    		                    clearAddForm();
	    		                }, function (reason) {
	    		                    //This will auto refresh table with newly added recipes via callback.
	    		                    exDialog.closeAll();                            
	    		                });
	    		            }
	    		            else {
	    		                //Reach maximum number of records for one load/refresh cycle.
	    		                exDialog.openMessage({
	    		                    scope: $scope,
	    		                    message: "The new recipe has successfully been added. \n\nThis is the last new recipe that can be added in current data load operation.",
	    		                    messageAddClass: 'ng-with-newlines',
	    		                    closeAllDialogs: true
	    		                });
	    		            }   
	  			        },
	  					function(errResponse){
	  						console.error('Error while fetching saveRecipe');
	  					}
	  			  );
	        }
       });
};

$scope.setVisited = function (baseElementName) {
	if ($scope.recipeForm[baseElementName]) {
	    $scope.recipeForm[baseElementName]['$visited'] = true;
	}
};

var clearAddForm = function () {

};

//Datepicker.
$scope.openDatePicker = function ($event) {
	$event.preventDefault();
	$event.stopPropagation();
	$scope.opened = true;
};
$scope.dateOptions = {
	formatYear: 'yyyy',
	startingDay: 1,
	showWeeks: 'false'
};
$scope.format = 'MM/dd/yyyy';

//Dirty sign (control border color) for Category dropdown.    
$scope.categoryChanged = function (selected) {
	if (selected != 0) 
	    $scope.ddlCategoryDirty = true;
	else
	    $scope.ddlCategoryDirty = false;
};

/*
//Dirty sign (control border color) for recipe Status dropdown.    
$scope.statusChanged = function (selected) {
	if (selected != 0)
	    $scope.ddlStatusDirty = true;
	else
	    $scope.ddlStatusDirty = false;
};*/

//Cache form dirty flag for close page warning.
$scope.$watch("recipeForm.$dirty", function (newValue, oldValue) {
	if (newValue != oldValue) {            
	   ///// $scope.body.dirty = newValue;
	}        
});

$scope.cancelAddOrUpdate = function () {	
	var flag = $scope.recipeForm.$dirty;	
	
	if ($scope.recipeForm.$dirty) {
	    //Build string part for differences in message text. 
	    var temp = "adding";
	    if ($scope.model.receipe.recipeId > 0)
	        temp = "updating";
	
	    exDialog.openConfirm({
	        scope: $scope,
	        title: "Cancel Confirmation",
	        message: "Are you sure to discard changes and cancel " + temp + " recipe?"
	    }).then(function (value) {
	        doCancel();
	    }, function (leaveIt) {
	        //Do nothing.               
	    });
	}
	else {
	    doCancel();
	}        
};
var doCancel = function () {
	//Clear form and explicitly reset $dirty flag to avoid dirty propagation to parent scope.
	$scope.recipeForm.$setPristine();
	$scope.closeThisDialog('close');
	};
}])

// This should goto common file
//Global function.
function getFormattedDate(date) {
    if (date == "") return "";
    try {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }
    catch (err) {
        return "error";
    }
}
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}