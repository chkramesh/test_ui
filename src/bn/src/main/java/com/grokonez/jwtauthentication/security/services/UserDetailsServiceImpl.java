package com.grokonez.jwtauthentication.security.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.grokonez.jwtauthentication.controller.UserThreadLocalContext;
import com.grokonez.jwtauthentication.model.Address;
import com.grokonez.jwtauthentication.model.Name;
import com.grokonez.jwtauthentication.model.UserDO;
import com.grokonez.jwtauthentication.repository.UserRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		System.out.println("UserDetailsServiceImpl loadUserByUsername username ============= " +username);
		
//		User user = userRepository.findByUsername(username).orElseThrow(
//				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		
		UserDO userDo = UserThreadLocalContext.getUser();
		
		UserDO appUserDo = new UserDO();
		// UserDO appUserDo = login(username, userDo.getPassword());
		
		try {
			appUserDo = login(username, userDo.getPassword());
		} catch (Exception e) {
			// User user = userDao.findByUsername(username);
			//logger.warn(e.getMessage(), e);
			System.out.println("Catch loadUserByUsername = " +e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException("User Not Found with -> username or email : " + username);
		}
		
		//System.out.println("UserDetailsServiceImpl loadUserByUsername email = " +UserPrinciple.build(user).getEmail());
		return UserPrinciple.build(appUserDo);
		
		//List<SimpleGrantedAuthority> collect = user.getRoles().stream().map(Role::getRolename).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        //return new JwtUser(user.getUsername(), user.getPassword(), user.getState(), collect);
	}
	
	public UserDO login(String username, String password) throws UsernameNotFoundException {
		
		//if (appUserDo == null) {
		if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
			throw new UsernameNotFoundException("User Not Found with -> username or email : " + username);
		}
		
		System.out.println("UserDetailsServiceImpl login() username ============= " +username + " password = "+ password);
		
//		 public UserDO(Long id, String email, Name name, Address address, String picture, String location,
//					boolean userStatus, String username, String password) {
//				//super();
//				this.id = id;
//				this.email = email;
//				this.name = name;
//				this.address = address;
//				this.picture = picture;
//				this.location = location;
//				this.userStatus = userStatus;
//				this.username = username;
//				this.password = password;
//			}
		
		// Call Database to check Login details or LDAP call
		// Then call application roles database call
		
		 //User appUser = new User();
		 UserDO appUserDo = null;
		 if(username.equalsIgnoreCase("venkat") || username.equalsIgnoreCase("venkat@test.com")) {
		//if (StringUtils.eequalsIgnoreCase(username, "venkat")) {
			 //logger.info("venkat Id gets access - thanks");
			 long longValue = 1;
			 //appUserDo = new UserDO(longValue , "Venkat", "venkat","vekat@testmail.com","venkat");
			 // appUserDo = new UserDO(longValue, "Venkat", "Valuri", "NJ", "venkat","vekat@testmail.com",password);		
			 Name myName = new Name("Venkat", "M", "Valuri");			 
			 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
			 appUserDo = new UserDO(longValue, "vekat@testmail.com", myName, myaddress, "pic1", "NJ", true, "venkat", password);
			 
			 ArrayList<String> roles = new ArrayList<>();
			 roles.add("ADMIN");		 
			 appUserDo.setRoles(roles);			 
			 //userRole.setRole("ROLE_ADMIN");
			 //userRole.setAuthenticated(true);
			// return userRole;			 
			 return appUserDo;
		  } else if(username.equalsIgnoreCase("admin") || username.equalsIgnoreCase("admin@test.com")) {
				 long longValue = 1;
//				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
//				 appUserDo = new UserDO(longValue, "Admin First", "Admin Last", "NY", "admin","admin@testmail.com", password);
				 Name myName = new Name("Admin F", "M", "Admin L");			 
				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
				 appUserDo = new UserDO(longValue, "admin@testmail.com", myName, myaddress, "pic1", "NY", true, "admin", password);
				 
				 ArrayList<String> roles = new ArrayList<>();
//				 roles.add("ADMIN");			 
				 roles.add("ROLE_ADMIN");
				 appUserDo.setRoles(roles);					 
				 return appUserDo;
		  }	 else if(username.equalsIgnoreCase("user") || username.equalsIgnoreCase("user@test.com")) {
				 long longValue = 1;
//				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
//				 appUserDo = new UserDO(longValue, "User First", "User Last", "NY", "user","user@testmail.com", password);
				 Name myName = new Name("User F", "User M", "USer L");			 
				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
				 appUserDo = new UserDO(longValue, "user@testmail.com", myName, myaddress, "pic1", "NJ", true, "user", password);
				 
				 ArrayList<String> roles = new ArrayList<>();
				 roles.add("USER");			 
				 appUserDo.setRoles(roles);					 
				 return appUserDo;
		  }	 else if(username.equalsIgnoreCase("manager") || username.equalsIgnoreCase("manager@test.com")) {
				 long longValue = 1;
//				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
//				 appUserDo = new UserDO(longValue, "manager First", "manager Last", "NY", "manager","manager@testmail.com", password);
				 Name myName = new Name("Manager F", "M", "Manager L");			 
				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
				 appUserDo = new UserDO(longValue, "manager@testmail.com", myName, myaddress, "pic1", "PA", true, "manager", password);
				 
				 ArrayList<String> roles = new ArrayList<>();
				 roles.add("manager");
//				 roles.add("MANAGER");
				 //roles.add("ROLE_MANAGER");	
				 //roles.add("ROLE_ADMIN");
				 appUserDo.setRoles(roles);					 
				 return appUserDo;
		  }	 else if(username.equalsIgnoreCase("clerk") || username.equalsIgnoreCase("clerk@test.com")) {
				 long longValue = 1;
//				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
//				 appUserDo = new UserDO(longValue, "Clerk First", "Clerk Last", "PA", "clerk","clerk@testmail.com", password);
				 Name myName = new Name("Clerk F", "M", "Clerk L");			 
				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
				 appUserDo = new UserDO(longValue, "clerk@testmail.com", myName, myaddress, "pic1", "NJ", true, "clerk", password);
				 
				 ArrayList<String> roles = new ArrayList<>();
//				 roles.add("ROLE_CLERK");			 
				 roles.add("clerk");
				 appUserDo.setRoles(roles);					 
				 return appUserDo;
		  }	else if(username.equalsIgnoreCase("cashier") || username.equalsIgnoreCase("cashier@test.com")) {
				 long longValue = 1;
//				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
//				 appUserDo = new UserDO(longValue, "Cashier First", "Cashier Last", "PA", "cashier","cashier@testmail.com", password);
				 Name myName = new Name("Cashier F", "M", "cashier L");			 
				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
				 appUserDo = new UserDO(longValue, "cashier@testmail.com", myName, myaddress, "pic1", "NJ", true, "cashier", password);
				 
				 ArrayList<String> roles = new ArrayList<>();
				 roles.add("ROLE_Cashier");			 
				 appUserDo.setRoles(roles);					 
				 return appUserDo;
		  }						  
		 
//		 public UserDO(Long id, String firstName, String lastName, String location, String username, String email, String password) {
//		        this.id = id;
//		        this.firstName = firstName;
//		        this.lastName = lastName;
//		        this.location = location;
//		        this.username = username;
//		        this.email = email;
//		        this.password = password;
//		    }
		
//		  User appUser = userRepository.findByUsername(username).orElseThrow(
//					() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		
		  return appUserDo;
		
	}
	

//	@Override public UserPrincipleNew loadUserByUsername(String username) throws UsernameNotFoundException {
//		
//		UserDO userDo = UserThreadLocalContext.getUser();
//        //UserDO user = userRepository.findByUsername(username);
//        UserDO appUserDo = login(username, userDo.getPassword());
//        if (appUserDo == null) {
//            throw new UsernameNotFoundException("User Not Found with -> username or email : " + username);
//        }
//        
//        boolean enabled = true;
//        boolean accountNonExpired = true;
//        boolean credentialsNotExpired = true;
//        boolean accountNonLocked = true;
//        
//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		String hashedPassword = passwordEncoder.encode(userDo.getPassword());
//		appUserDo.setPassword(hashedPassword);
//        
//        UserPrincipleNew principal = new UserPrincipleNew(
//        		appUserDo,
//                enabled, accountNonExpired, credentialsNotExpired, accountNonLocked,
//                getAuthorities(appUserDo.getRoles())
//        );
//        return principal;
//    }
// 
//    private List<GrantedAuthority> getAuthorities(List<String> roles) {
//        return roles.stream()
//                .map(r -> new SimpleGrantedAuthority(r))
//                .collect(Collectors.toList());
//    }
	
	
	
    
    
}