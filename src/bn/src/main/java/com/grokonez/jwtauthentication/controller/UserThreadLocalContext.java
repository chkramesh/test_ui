package com.grokonez.jwtauthentication.controller;

import com.grokonez.jwtauthentication.model.UserDO;

public final class UserThreadLocalContext {
	
	 private static final ThreadLocal<UserDO> threadLocalPwd = new ThreadLocal<UserDO>() {
	        protected UserDO initialValue() {
	            return null;
	        }
	    };

	    /**
	     * @return Returns User object
	     */
	    public static UserDO getUser() {
	        final UserDO user = threadLocalPwd.get();
	        return user;
	    }

	    /**
	     * @param User
	     */
	    public static void setUser(final UserDO user) {
	       
	        threadLocalPwd.set(user);
	    }

	    /**
	     * <p>
	     * This method to removes the ThreadLocal Reference
	     * </p>
	     * <p>
	     * This method MUST be called after the ThreadLocal usage otherwise it may
	     * cause some side effects on a Thread re-entrance.
	     * </p>
	     * <h2>Cleaning up after the ThreadLocal usage is the responsibility of the
	     * client code</h2>
	     * 
	     * @see ThreadLocal
	     */
	    public static void cleanup() {
	       
	    	threadLocalPwd.remove();
	    }

}
