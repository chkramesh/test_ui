package com.grokonez.jwtauthentication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grokonez.jwtauthentication.exception.CustomException;
import com.grokonez.jwtauthentication.message.response.JwtResponse;
import com.grokonez.jwtauthentication.model.Response;
import com.grokonez.jwtauthentication.model.UserDO;
import com.grokonez.jwtauthentication.model.UserRespObject;
import com.grokonez.jwtauthentication.repository.UserRepository;
import com.grokonez.jwtauthentication.security.jwt.JwtProvider;
import com.grokonez.jwtauthentication.service.UserService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserRestAPI {
	
	@Autowired
	private UserService userService;

//	@Autowired
//	UserRepository userRepository;
//
//	@Autowired
//	JwtProvider jwtProvider;
	
//	@Autowired
//	private UserDetailsServiceImpl userAuthService;
	
	// http://localhost:8080//wsadmin/token/generate-token

	@GetMapping("/getAllUsers")
	// @PostMapping("/getAllUsers")
	// public ResponseEntity<?> getUsers(@Valid @RequestBody LoginForm loginRequest) {
	public ResponseEntity<?> getAllUsers() throws CustomException {

		System.out.println("Controller UserRestAPI getUsers()"); // = = " + loginRequest.getUsername() + " password = "+loginRequest.getPassword());
		
		UserDO appUserDo = new UserDO();	
		
		Response<UserRespObject> userResp = new Response<>();
		List<UserDO> userList = null;

		UserRespObject userRespObject = new UserRespObject();
		userRespObject.setUser("user");
		
		try {
			userList = userService.getAllUsers();
			userResp.setErrorCode(0);
			userRespObject.setUserArr(userList);
			
			System.out.println("Controller UserRestAPI getUsers() userList = " + userList);
			System.out.println("Controller UserRestAPI getUsers() userList.size() = " + userList.size());
			//logger.info("getAllPartners - partnerList count - {}", (partnerList!=null)? partnerList.size(): "null");

		} catch (Exception e) {			
			e.printStackTrace();
			throw new CustomException(e);
		}
		userResp.setRespObject(userRespObject);
		
		//logger.info("getAllPartners completed - returning");
		
		// return partnerResp;
		 
//		return ResponseEntity.ok(new JwtResponse(userPrinciple.getUserDo()));
		return ResponseEntity.ok(userResp);		
	}
	
	//http://localhost:8080/api/user/getUser/managerId 401
	
	@GetMapping("/getUser")
	public Response<UserRespObject> getUser() {
	//public Response<UserRespObject> getUser(@PathVariable final String id) {
		
		System.out.println("UserService getUser getUser");
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
	
	
	/*
	@GetMapping("/getUser/{id}")
	public Response<UserRespObject> getUser(@PathVariable final Integer id) {
	//public Response<UserRespObject> getUser(@PathVariable final String id) {
		
		System.out.println("UserService getUser getUser = " + id);
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
	*/
	
}	
	