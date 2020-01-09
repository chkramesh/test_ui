package com.grokonez.jwtauthentication.security.services;

//import com.grokonez.jwtauthentication.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grokonez.jwtauthentication.model.UserDO;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserPrinciple implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;

    private String name;

    private String username;

    private String email;

    @JsonIgnore
    private String password;
    
    
    // Second Approach, We don't need above getter/setters
    UserDO userDo;

    private Collection<? extends GrantedAuthority> authorities;    
    //private  GrantedAuthority authorities_1;

    // First Approach
    public UserPrinciple(Long id, String name, 
			    		String username, String email, String password, 
			    		Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }
    
    // Second Approach
    public UserPrinciple(
    		// Long id, String name, String username, String email,
    		UserDO userdo,
    		String password, 
    		Collection<? extends GrantedAuthority> authorities) {
//		this.id = id;
//		this.name = name;
//		this.username = username;
//		this.email = email;
    	this.userDo = userdo;
		this.password = password;
		this.authorities = authorities;
	}
    
    public static UserPrinciple build(UserDO user) {
    	    	
    	ArrayList<String> roles = new ArrayList<>();
    	roles = (ArrayList<String>) user.getRoles();
    	List<String> ro = user.getRoles();
    	 
    	//System.out.println("UserPrinciple build user.getRoles() = " +user.getRoles());
    	//System.out.println("UserPrinciple build user.getRoles() ro = " +ro);
    	    	
    	 List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->     
                new SimpleGrantedAuthority(role)
         ).collect(Collectors.toList());
    	 
    	 // System.out.println("UserPrinciple build user.getRoles() authorities = " + authorities);
    	 // System.out.println("UserPrinciple build user.getRoles() user.getPassword() = " + user.getPassword());
//    	 System.out.println("UserPrinciple build user.getRoles() user.getId() = " + user.getId() + " firstName = "+user.getFirstName() + " userName = "+ user.getUsername() + " emmail = "+ user.getEmail());
    	 System.out.println("UserPrinciple build user.getRoles() user.getId() = " + user.getId() + " firstName = "+user.getName().getFirst() + " userName = "+ user.getUsername() + " emmail = "+ user.getEmail());
    	 
    	 PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		 String hashedPassword = passwordEncoder.encode(user.getPassword());
    	
//        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->     
//                new SimpleGrantedAuthority(role.getName().name())
//        ).collect(Collectors.toList());

		// First Approach
		/* 
        return new UserPrinciple(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                //user.getPassword(),
                hashedPassword,
                authorities
        );
        */
		 
		// Second Approach
		return new UserPrinciple(
			    user,
                hashedPassword,
                authorities
	     );
    }

//    public static UserPrinciple build(User user) {
//        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
//                new SimpleGrantedAuthority(role.getName().name())
//        ).collect(Collectors.toList());
//
//        return new UserPrinciple(
//                user.getId(),
//                user.getName(),
//                user.getUsername(),
//                user.getEmail(),
//                user.getPassword(),
//                authorities
//        );
//    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
    ///////
    public UserDO getUserDo() {
		return userDo;
	}

	public void setUserDo(UserDO userDo) {
		this.userDo = userDo;
	}
    
	////////////////////////

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        UserPrinciple user = (UserPrinciple) o;
        return Objects.equals(id, user.id);
    }

	
}