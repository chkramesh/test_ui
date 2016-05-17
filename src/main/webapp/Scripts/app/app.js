var foodSenseApp = angular.module('FoodSenseApp', [
    'ngRoute',
    'RecipesController',
    'AboutControllers',
    'ui.bootstrap',
    'smApp.directives',
    'ui.bootstrap',
    'ngTable',
    'ngExDialog',
    'ajaxLoader',
    'ngResource'   
]);

foodSenseApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/recipesList', {
    	 templateUrl: 'Pages/recipes.html',
         controller: 'RecipesListController'
    })
    .when('/about', {
        templateUrl: 'Pages/about.html',
        controller: 'AboutListController'
    })
    .otherwise({
        redirectTo: '/recipesList'
    });
}]);


//Dialog default settings.
foodSenseApp.config(['exDialogProvider', function (exDialogProvider) {
    exDialogProvider.setDefaults({
        template: 'ngExDialog/commonDialog.html',
        width: '330px',       
    });
}]);
