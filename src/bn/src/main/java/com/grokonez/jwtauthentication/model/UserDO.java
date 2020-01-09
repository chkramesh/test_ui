package com.grokonez.jwtauthentication.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class UserDO {

    @Id
    @GeneratedValue
    private Long id;
    private String email;
    private Name name;
    private Address address;
//    private String firstName;
//    private String lastName;
    private String picture;
    private String location;
    private boolean userStatus;
    private String username;
    private String password;

    private ArrayList<String> roles = new ArrayList<>();
    
    public UserDO() {}       

    public UserDO(Long id, String email, Name name, Address address, String picture, String location,
			boolean userStatus, String username, String password) {
		//super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.address = address;
		this.picture = picture;
		this.location = location;
		this.userStatus = userStatus;
		this.username = username;
		this.password = password;
	}

//    public UserDO(Long id, String firstName, String lastName, String location, String username, String email, String password) {
//        this.id = id;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.location = location;
//        this.username = username;
//        this.email = email;
//        this.password = password;
//    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Name getName() {
		return name;
	}

	public void setName(Name name) {
		this.name = name;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public boolean isUserStatus() {
		return userStatus;
	}

	public void setUserStatus(boolean userStatus) {
		this.userStatus = userStatus;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<String> getRoles() {
        return new ArrayList<>(roles);
    }

    public UserDO setRoles(List<String> roles) {
        this.roles = new ArrayList<>(roles);
        return this;
    }
}

//@Entity
//public class UserDO {
//
//    @Id
//    @GeneratedValue
//    private Long id;
//    private String email;
//    //private String name;
//    private String firstName;
//    private String lastName;
//    private String location;
//    private String username;
//    private String password;
//
//    private ArrayList<String> roles = new ArrayList<>();
//    
//    public UserDO() {}
//
//    public UserDO(Long id, String firstName, String lastName, String location, String username, String email, String password) {
//        this.id = id;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.location = location;
//        this.username = username;
//        this.email = email;
//        this.password = password;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public UserDO setId(Long id) {
//        this.id = id;
//        return this;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public UserDO setEmail(String email) {
//        this.email = email;
//        return this;
//    }    
//    
//	public String getFirstName() {
//		return firstName;
//	}
//
//	public void setFirstName(String firstName) {
//		this.firstName = firstName;
//	}
//
//	public String getLastName() {
//		return lastName;
//	}
//
//	public void setLastName(String lastName) {
//		this.lastName = lastName;
//	}
//
//	public String getLocation() {
//		return location;
//	}
//
//	public void setLocation(String location) {
//		this.location = location;
//	}
//
//	public String getUsername() {
//        return username;
//    }
//
//    public UserDO setUsername(String username) {
//        this.username = username;
//        return this;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public UserDO setPassword(String password) {
//        this.password = password;
//        return this;
//    }
//
//    public List<String> getRoles() {
//        return new ArrayList<>(roles);
//    }
//
//    public UserDO setRoles(List<String> roles) {
//        this.roles = new ArrayList<>(roles);
//        return this;
//    }
//}