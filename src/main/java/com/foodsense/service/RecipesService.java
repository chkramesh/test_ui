package com.foodsense.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import com.common.view.CommonViewResponse;
import com.foodsense.model.Recipes;

public class RecipesService {
	private static final AtomicLong counter = new AtomicLong();
	private static List<Recipes> recipesList;
	
	static{
		recipesList= populateDummyRecipes();
	}
	public CommonViewResponse<Recipes> findRecipesList() {
	
			final CommonViewResponse<Recipes> gridResponse = new CommonViewResponse<Recipes>();			
			int total=0;			
			total = recipesList.size();
			gridResponse.setRows(recipesList);
			gridResponse.setTotal(String.valueOf(total));			
			gridResponse.setSuccess(true);
			 
			return gridResponse;
	}
	
	public CommonViewResponse<Recipes> addRecipes(Recipes recipes) {
				final CommonViewResponse<Recipes> gridResponse = new CommonViewResponse<Recipes>();			
				int total=0;
				
				total = recipesList.size();				
				recipes.setRecipeId(total+1);
				
				recipesList.add(recipes);
				
				gridResponse.setRows(recipesList);
				gridResponse.setTotal(String.valueOf(recipesList.size()));				
				gridResponse.setSuccess(true);
				 
				return gridResponse;
	}
	
	private static List<Recipes> populateDummyRecipes(){
		List<Recipes> recipes = new ArrayList<Recipes>();
		
		recipes.add(new Recipes(1,"recipe_1", "2012's Best Summer Cookbooks",   "With the best of the season coming from \"orchards, farms and gardens,\" NPR has put together an impressive collection of 10 summer cookbooks.", new Date()));
		recipes.add(new Recipes(2,"recipe_2", "How to Make Vegetable Chips", "About a month ago, I ate almost an entire box of kale chips. My brother and I were visiting our cousin in Brooklyn, and before very thoughtfully prepared vegan...", new Date()));
		
		recipes.add(new Recipes(3,"recipe_3", "Join us on Pinterest", "If I could curate a cookbook for you, this would be it.", new Date()));
		recipes.add(new Recipes(4,"recipe_4", "Recipes from a Sunday Supper", "I could not figure out what to do with the delectable slices of Pear Cake that I brought home from this wonderful Sunday supper - eat them slowly, a little bit at...", new Date()));
		
		return recipes;
	}
	

}
