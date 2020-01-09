package com.grokonez.jwtauthentication.message.response;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import com.grokonez.jwtauthentication.model.UserDO;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private String username;
	private Collection<? extends GrantedAuthority> authorities;
	
	
	//RC::
	private UserDO userDo;
	//private boolean isAuthenticated;
	private boolean authenticated;

//	public JwtResponse(String accessToken, String username, Collection<? extends GrantedAuthority> authorities) {
//		this.token = accessToken;
//		this.username = username;
//		this.authorities = authorities;
//	}
	
//	// RC::
//	public JwtResponse(String accessToken, String username, Collection<? extends GrantedAuthority> authorities, UserDO userDo) {
//		this.token = accessToken;
//		this.username = username;
//		this.authorities = authorities;
//		this.userDo = userDo;
//	}
	
   // RC::
	public JwtResponse(boolean authenticated, String accessToken, String username, Collection<? extends GrantedAuthority> authorities, UserDO userDo) {
		this.authenticated = authenticated;
		this.token = accessToken;
		this.username = username;
		this.authorities = authorities;
		this.userDo = userDo;
	}
	
	

	public boolean isAuthenticated() {
		return authenticated;
	}


	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}



	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public UserDO getUserDo() {
		return userDo;
	}

	public void setUserDo(UserDO userDo) {
		this.userDo = userDo;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
    
    
    
    
}