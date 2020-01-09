package com.grokonez.jwtauthentication.model;

import java.util.List;

public class  UserRespObject<T> {
	String user;
	List<T> userArr;
	
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public List<T> getUserArr() {
		return userArr;
	}
	public void setUserArr(List<T> userArr) {
		this.userArr = userArr;
	}
}
