package com.grokonez.jwtauthentication.exception;

public class CustomException extends Exception {
    private static final long serialVersionUID = 1;

    public CustomException(Throwable cause) {
        super(cause);
    }
    public CustomException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public CustomException(Exception cause) {
        super(cause);
    }
    public CustomException(String message, Exception cause) {
        super(message, cause);
    }
	public CustomException(String string) {
		super(string);
	}
}