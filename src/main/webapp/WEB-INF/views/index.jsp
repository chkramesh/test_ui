<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
  <head>      
    <meta name="viewport" content="width=device-width" />
    <title>Food Sense Demo</title>    
    
    <!-- AngularJS and Bootstrap CSS -->
    <link rel="stylesheet" href="Content/bootstrap-3.1.1/css/bootstrap.css" />
    <link rel="stylesheet" href="Content/ng/ng-table.css" />
    <link rel="stylesheet" href="Content/ng/ngExDialog.css">
    
    <!-- Application specific CSS and google fonts-->
    <link rel="stylesheet" href="Content/css/Site.css" />
    
    <!-- AngularJS and Bootstrap -->
    <script src="Scripts/Libs/angular.js"></script>
    <script src="Scripts/Libs/angular-route.js"></script>
    <script src="Scripts/Libs/angular-resource.js"></script>    
    <script src="Scripts/Libs/ui-bootstrap-tpls-0.12.0.js"></script>
    
    <script src="Scripts/Libs/ng-table.js"></script>
    <script src="Scripts/Libs/ngExDialog.js"></script>
  </head> 
  
  <body ng-app="FoodSenseApp" class="ng-cloak">      
     <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <h4> <i>Food Sense</i></h4>
                <h3> Demo </h3>
            </div>            
            <ul class="nav navbar-nav navbar-right">
             <li><a href="#recipesList"><i class="glyphicon glyphicon-home"></i> Recipes List </a></li> 
             <li><a href="#about"><i class="glyphicon glyphicon-user"></i>About</a></li>              
            </ul>
        </div>
    </nav>   
    <div id="main" class="body-content">        
        <!-- Content will be injected here -->
        <div ng-view></div>            
    </div>
    
    <footer class="footer">
        <div class="container">
            <p class="text-muted">@Food Sense</p>
        </div>
    </footer>
    
    <div class="loader-div" loader>
        <img src="Content/Images/loader-indicator.gif" class="ajax-loader" />
    </div>
    
    <!-- Load AngularJS application module. -->
    <script type="text/javascript" src="./Scripts/app/app.js"></script>    
    
    <!-- Load Controllers. --> 
    <script type="text/javascript" src="./Scripts/app/controller/AboutController.js"></script>
    <script type="text/javascript" src="./Scripts/app/controller/RecipesController.js"></script>
   
    <!-- Load Services. -->  
    <script type="text/javascript" src="Scripts/app/services/RecipesService.js"></script>  
    <script type="text/javascript" src="Scripts/app/commonservices/AppServices.js"></script>
    <script type="text/javascript" src="Scripts/app/commonservices/CommonServices.js"></script>    
    
    <!-- common -->    
    <script type="text/javascript" src="Scripts/app/common/ajaxLoader.js"></script>
    <script type="text/javascript" src="Scripts/app/common/directives.js"></script>
  
  </body>
</html>
