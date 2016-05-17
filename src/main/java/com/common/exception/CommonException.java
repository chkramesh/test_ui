package com.common.exception;

/**
 * Application level exception class.
 * 
 */
public class CommonException extends Exception {

	/**
	 * default serial versionId.
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * constructor passes given message to the super class.
	 * 
	 * @param msg it is message to be displayed with the Exception.
	 */
	public CommonException(final String msg) {
		super(msg);
	}

	/**
	 * constructor passes given message with the actual exception object to the
	 * super class.
	 * 
	 * @param msg it is message to be displayed with the Exception.
	 * @param th it is java.lang.Throwable object.
	 */
	public CommonException(final String msg, final Throwable th) {
		super(msg, th);
	}
}
