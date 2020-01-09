package com.grokonez.jwtauthentication.model;

public class Response<T> {
	int errorCode;
	String errorDescription;
	String errorMessage;
	T respObject;
	
	
	public int getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}
	public String getErrorDescription() {
		return errorDescription;
	}
	public void setErrorDescription(String errorDescription) {
		this.errorDescription = errorDescription;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public T getRespObject() {
		return respObject;
	}
	public void setRespObject(T respObject) {
		this.respObject = respObject;
	}
}
