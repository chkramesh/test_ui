package com.foodsense.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.common.view.CommonViewResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodsense.model.Recipes;
import com.foodsense.service.RecipesService;
	
	@Controller
	@RequestMapping("/")
	public class RecipesController {
	 
	  private static final Logger logger = LoggerFactory.getLogger(RecipesController.class);
	  public static final String APPLICATION_JSON = "application/json";	 
	 
	  RecipesService recipesService=new RecipesService();
	  	  
	  @RequestMapping(value = "/recipeslist", method = RequestMethod.GET)
	  public @ResponseBody CommonViewResponse<Recipes> recipesList(
				    @RequestParam(value="limit", required=false, defaultValue = "5") int limit,
				    @RequestParam(value="page", required=false, defaultValue = "1") int page,
				    @RequestParam(value="start", required=false, defaultValue = "1") int start)  throws Exception{	
			
				CommonViewResponse<Recipes> gridResponse = new CommonViewResponse<Recipes>();
				
				try {					
					gridResponse = recipesService.findRecipesList();
					return gridResponse;
				} catch (Exception e) {					
					gridResponse.setSuccess(false);
					gridResponse.setReason(e.getMessage());
					return gridResponse; 
				}
	 }
	  
	 @RequestMapping(value="/addreceipe", method=RequestMethod.POST)
	 public @ResponseBody CommonViewResponse<Recipes> addReceipe(@RequestBody String recipeObj) throws Exception{
		  		 
		      CommonViewResponse<Recipes> gridResponse = new CommonViewResponse<Recipes>();  
		      // The request body will contain the entire JSON content.
		      ObjectMapper mapper = new ObjectMapper();
		      
		      // And then use the convertValue method of the mapper to get your different objects from the string.
		      JsonNode node = mapper.readTree(recipeObj);
		      Recipes recipes = mapper.convertValue(node.get("paramData"), Recipes.class);
		      try {					
		    	    gridResponse = recipesService.addRecipes(recipes);
		    	    gridResponse.setSuccess(true);
					return gridResponse;
				} catch (Exception e) {					
					gridResponse.setSuccess(false);
					gridResponse.setReason(e.getMessage());
					return gridResponse; 
				}
    }
}
