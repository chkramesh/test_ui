var AboutControllers = angular.module("AboutControllers", ['ngTable']);

AboutControllers.controller("AboutListController", ['$scope', '$http', '$filter', 'ngTableParams',
 function ($scope, $http, $filter, ngTableParams) {    
     $scope.message = 'This is an About Page.';
     
 }]
);
