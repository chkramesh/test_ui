package com.foodsense.model;

import java.util.Date;

public class Recipes {
	
	private int recipeId;
    private String recipeImage;    
    private String title;  
    private String summary;
    private Date availableSince;
        
    public Recipes(){
    	
    }
    
	public Recipes(int recipeId, String recipeImage, String title,
			String summary, Date availableSince) {	
		this.recipeId = recipeId;
		this.recipeImage = recipeImage;
		this.title = title;
		this.summary = summary;
		this.availableSince = availableSince;
	}
	
	public Recipes(int recipeId, String title, String summary,
			Date availableSince) {
		super();
		this.recipeId = recipeId;
		this.title = title;
		this.summary = summary;
		this.availableSince = availableSince;
	}

	public int getRecipeId() {
		return recipeId;
	}
	public void setRecipeId(int recipeId) {
		this.recipeId = recipeId;
	}
	public String getRecipeImage() {
		return recipeImage;
	}
	public void setRecipeImage(String recipeImage) {
		this.recipeImage = recipeImage;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public Date getAvailableSince() {
		return availableSince;
	}
	public void setAvailableSince(Date availableSince) {
		this.availableSince = availableSince;
	}
    
    

}

