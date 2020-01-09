package com.grokonez.jwtauthentication.controller;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grokonez.jwtauthentication.message.request.LoginForm;
import com.grokonez.jwtauthentication.message.request.SignUpForm;
import com.grokonez.jwtauthentication.message.response.JwtResponse;
import com.grokonez.jwtauthentication.message.response.ResponseMessage;
import com.grokonez.jwtauthentication.model.Response;
import com.grokonez.jwtauthentication.model.Role;
import com.grokonez.jwtauthentication.model.RoleName;
import com.grokonez.jwtauthentication.model.User;
import com.grokonez.jwtauthentication.model.UserDO;
import com.grokonez.jwtauthentication.model.UserRespObject;
import com.grokonez.jwtauthentication.repository.RoleRepository;
import com.grokonez.jwtauthentication.repository.UserRepository;
import com.grokonez.jwtauthentication.security.jwt.JwtProvider;
import com.grokonez.jwtauthentication.security.services.UserDetailsServiceImpl;
import com.grokonez.jwtauthentication.security.services.UserPrinciple;

//import antlr.collections.List;
import java.util.List;
import java.util.Base64;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthRestAPIs {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtProvider jwtProvider;
	
	@Autowired
	private UserDetailsServiceImpl userAuthService;
	
	// http://localhost:8080//wsadmin/token/generate-token

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

		System.out.println("Controller authenticateUser name = = " + loginRequest.getUsername() + " password = "+loginRequest.getPassword());
			
	    UserDO appUserDo = new UserDO();	
		byte[] decodedBytes = Base64.getDecoder().decode(loginRequest.getPassword());		
		
		appUserDo.setPassword(new String(decodedBytes));    	
    	UserThreadLocalContext.setUser(appUserDo);
    			
//		Authentication authentication = authenticationManager.authenticate(
//				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    	
    	Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), appUserDo.getPassword()));
    	
		
    	// # First approach
		UserPrinciple userPrinciple = (UserPrinciple) userAuthService.loadUserByUsername(loginRequest.getUsername());		
		System.out.println("2 Controller authenticateUser 1 - 5 name = = " + userPrinciple.getUsername() + " email = "+userPrinciple.getEmail()  + " getPassword = " +userPrinciple.getPassword());
		
		// # Second approach 
		System.out.println("2 Controller authenticateUser 1 - 5 name = = " + userPrinciple.getUserDo().getUsername() + " email = "+userPrinciple.getUserDo().getEmail()  + " getPassword = " +userPrinciple.getPassword());
		
				
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateJwtToken(authentication);
		
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();			
		// System.out.println("Controller authenticateUser getAuthorities  ======= = " +userDetails.getAuthorities());		
	
		// return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
		// RC::
		
		 boolean isAuthenticated = true;
//		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities(), userPrinciple.getUserDo()));
		return ResponseEntity.ok(new JwtResponse(isAuthenticated, jwt, userDetails.getUsername(), userDetails.getAuthorities(), userPrinciple.getUserDo()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));
		
		System.out.println("Controller user name = = " + user.getName());

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();
		
		System.out.println("Controller user strRoles = = " +strRoles);
		

		strRoles.forEach(role -> {
			switch (role) {
			case "admin":
				Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
				roles.add(adminRole);

				break;
			case "pm":
				Role pmRole = roleRepository.findByName(RoleName.ROLE_PM)
						.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
				System.out.println("Controller user pmRole = = " +pmRole);
				roles.add(pmRole);

				break;
			default:
				Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
						.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
				roles.add(userRole);
			}
		});
		
		System.out.println("Controller user name = = " + user.getName());

		user.setRoles(roles);
		userRepository.save(user);

		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
	}
	
	@GetMapping("/getUserTest")
	public Response<UserRespObject> getUser() {
	//public Response<UserRespObject> getUser(@PathVariable final String id) {
		
		System.out.println("Auth Controller getUser getUser");
		//System.out.println("UserService getUser getUser = " + id);
		//logger.info("[C] getPartner - called for: {}", id);
		Response<UserRespObject> partnerResp = new Response<>();		

//		UserDO partner = userService.getUser(id);
//		
//		List<UserDO> partnerList = new ArrayList<>();
//		partnerList.add(partner);
//
//		partnerResp.setErrorCode(0);
//		UserRespObject partnerRespObject = new UserRespObject();
//		partnerRespObject.setUser("user");
//		partnerRespObject.setUserArr(partnerList);
//		partnerResp.setRespObject(partnerRespObject);
		
		
		//logger.info("getPartner completed - returning");
		
		return partnerResp;
	}
	
}