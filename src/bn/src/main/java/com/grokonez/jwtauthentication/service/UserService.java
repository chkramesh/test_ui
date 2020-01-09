package com.grokonez.jwtauthentication.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.grokonez.jwtauthentication.model.Address;
import com.grokonez.jwtauthentication.model.Name;
import com.grokonez.jwtauthentication.model.UserDO;

@Service
public class UserService {
	
//	@Autowired
//	private PartnerDAO partnerDAO;
	
	//Logger logger = LoggerFactory.getLogger(PartnerService.class);
	
	public List<UserDO> getAllSummyUsers() {		
		long longValue = 1;
		 
		 UserDO appUserDo_1 = null;
		 UserDO appUserDo_2 = null;
		 UserDO appUserDo_3 = null;
		 UserDO appUserDo_4 = null;	
		 
		 Name myName_1 = new Name("Venkat", "M", "Valuri");			 
		 Address myaddress_1 = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
		 appUserDo_1 = new UserDO(longValue, "vekat@testmail.com", myName_1, myaddress_1, "pic1", "NJ", true, "venkat", "");
		 ArrayList<String> roles_1 = new ArrayList<>();
		 roles_1.add("ADMIN");		 
		 appUserDo_1.setRoles(roles_1);	
		 ///
		 
		 Name myName_2 = new Name("Admin F", "M", "Admin L");			 
		 Address myaddress_2 = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
		 appUserDo_2 = new UserDO(longValue, "admin@testmail.com", myName_2, myaddress_2, "pic1", "NY", true, "admin", "");
		 
		 ArrayList<String> roles_2 = new ArrayList<>();
//		 roles.add("ADMIN");			 
		 roles_2.add("ROLE_ADMIN");
		 appUserDo_2.setRoles(roles_2);
		 ///
		 
		 Name myName_3 = new Name("User F", "User M", "USer L");			 
		 Address myaddress_3 = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
		 appUserDo_3 = new UserDO(longValue, "user@testmail.com", myName_3, myaddress_3, "pic1", "NJ", true, "user", "");
		 
		 ArrayList<String> roles_3 = new ArrayList<>();
		 roles_3.add("USER");			 
		 appUserDo_3.setRoles(roles_3);		
		 
		 Name myName_4 = new Name("Manager F", "M", "Manager L");			 
		 Address myaddress_4 = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
		 appUserDo_4 = new UserDO(longValue, "manager@testmail.com", myName_4, myaddress_4, "pic1", "PA", true, "managerId", "");
		 
		 ArrayList<String> roles_4 = new ArrayList<>();
		 roles_4.add("manager");
		 appUserDo_4.setRoles(roles_4);
		 
		 /////
		 List<UserDO> userList = new ArrayList<UserDO>(); 
		 userList.add(appUserDo_1);
		 userList.add(appUserDo_2);
		 userList.add(appUserDo_3);
		 userList.add(appUserDo_4);
		 
		 return userList;		
	}
	
	@Transactional(readOnly = true)
	public UserDO getUser(String userName) {
		
		System.out.println("UserService getUser userName = " + userName);
		UserDO userDO = new UserDO();	
		
	    List<UserDO> userList = getAllSummyUsers();
	    
	    UserDO tmpElement = null;	    
	    for (int index=0; index < userList.size(); index++) {
            tmpElement = userList.get(index);
            
            if(userName.equalsIgnoreCase(tmpElement.getUsername())){
            	return tmpElement;
            }
            
            //tmpElement.setPartnerPwd(strConvert(tmpElement.getPartnerPwd()));
            //tmpElement = null;
        }
	    return userDO;
		
	}
	
	@Transactional(readOnly = true)
	public List<UserDO> getAllUsers() {
		
//		 long longValue = 1;
//		 
//		 UserDO appUserDo_1 = null;
//		 UserDO appUserDo_2 = null;
//		 UserDO appUserDo_3 = null;
//		 UserDO appUserDo_4 = null;		 
//		
//		 
//		 Name myName_1 = new Name("Venkat", "M", "Valuri");			 
//		 Address myaddress_1 = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//		 appUserDo_1 = new UserDO(longValue, "vekat@testmail.com", myName_1, myaddress_1, "pic1", "NJ", true, "venkat", "");
//		 ArrayList<String> roles_1 = new ArrayList<>();
//		 roles_1.add("ADMIN");		 
//		 appUserDo_1.setRoles(roles_1);	
//		 ///
//		 
//		 Name myName_2 = new Name("Admin F", "M", "Admin L");			 
//		 Address myaddress_2 = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//		 appUserDo_2 = new UserDO(longValue, "admin@testmail.com", myName_2, myaddress_2, "pic1", "NY", true, "admin", "");
//		 
//		 ArrayList<String> roles_2 = new ArrayList<>();
////		 roles.add("ADMIN");			 
//		 roles_2.add("ROLE_ADMIN");
//		 appUserDo_2.setRoles(roles_2);
//		 ///
//		 
//		 Name myName_3 = new Name("User F", "User M", "USer L");			 
//		 Address myaddress_3 = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//		 appUserDo_3 = new UserDO(longValue, "user@testmail.com", myName_3, myaddress_3, "pic1", "NJ", true, "user", "");
//		 
//		 ArrayList<String> roles_3 = new ArrayList<>();
//		 roles_3.add("USER");			 
//		 appUserDo_3.setRoles(roles_3);		
//		 
//		 Name myName_4 = new Name("Manager F", "M", "Manager L");			 
//		 Address myaddress_4 = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//		 appUserDo_4 = new UserDO(longValue, "manager@testmail.com", myName_4, myaddress_4, "pic1", "PA", true, "managerId", "");
//		 
//		 ArrayList<String> roles_4 = new ArrayList<>();
//		 roles_4.add("manager");
//		 appUserDo_4.setRoles(roles_4);
//		 
//		 /////
//		 List<UserDO> userList = new ArrayList<UserDO>(); 
//		 userList.add(appUserDo_1);
//		 userList.add(appUserDo_2);
//		 userList.add(appUserDo_3);
//		 userList.add(appUserDo_4);
		 
		 // return userList;
		return getAllSummyUsers();
		 
		 //List<UserDO> lstObj1 = partnerDAO.getAllPartners();
		 
		 
		 
//		 if(username.equalsIgnoreCase("venkat") || username.equalsIgnoreCase("venkat@test.com")) {
//		//if (StringUtils.eequalsIgnoreCase(username, "venkat")) {
//			 //logger.info("venkat Id gets access - thanks");
//			 long longValue = 1;
//			 //appUserDo = new UserDO(longValue , "Venkat", "venkat","vekat@testmail.com","venkat");
//			 // appUserDo = new UserDO(longValue, "Venkat", "Valuri", "NJ", "venkat","vekat@testmail.com",password);		
//			 Name myName = new Name("Venkat", "M", "Valuri");			 
//			 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//			 appUserDo = new UserDO(longValue, "vekat@testmail.com", myName, myaddress, "pic1", "NJ", true, "venkat", password);
//			 
//			 ArrayList<String> roles = new ArrayList<>();
//			 roles.add("ADMIN");		 
//			 appUserDo.setRoles(roles);			 
//			 //userRole.setRole("ROLE_ADMIN");
//			 //userRole.setAuthenticated(true);
//			// return userRole;			 
//			 return appUserDo;
//		  } else if(username.equalsIgnoreCase("admin") || username.equalsIgnoreCase("admin@test.com")) {
//				 long longValue = 1;
////				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
////				 appUserDo = new UserDO(longValue, "Admin First", "Admin Last", "NY", "admin","admin@testmail.com", password);
//				 Name myName = new Name("Admin F", "M", "Admin L");			 
//				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//				 appUserDo = new UserDO(longValue, "admin@testmail.com", myName, myaddress, "pic1", "NY", true, "admin", password);
//				 
//				 ArrayList<String> roles = new ArrayList<>();
////				 roles.add("ADMIN");			 
//				 roles.add("ROLE_ADMIN");
//				 appUserDo.setRoles(roles);					 
//				 return appUserDo;
//		  }	 else if(username.equalsIgnoreCase("user") || username.equalsIgnoreCase("user@test.com")) {
//				 long longValue = 1;
////				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
////				 appUserDo = new UserDO(longValue, "User First", "User Last", "NY", "user","user@testmail.com", password);
//				 Name myName = new Name("User F", "User M", "USer L");			 
//				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//				 appUserDo = new UserDO(longValue, "user@testmail.com", myName, myaddress, "pic1", "NJ", true, "user", password);
//				 
//				 ArrayList<String> roles = new ArrayList<>();
//				 roles.add("USER");			 
//				 appUserDo.setRoles(roles);					 
//				 return appUserDo;
//		  }	 else if(username.equalsIgnoreCase("manager") || username.equalsIgnoreCase("manager@test.com")) {
//				 long longValue = 1;
////				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
////				 appUserDo = new UserDO(longValue, "manager First", "manager Last", "NY", "manager","manager@testmail.com", password);
//				 Name myName = new Name("Manager F", "M", "Manager L");			 
//				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//				 appUserDo = new UserDO(longValue, "manager@testmail.com", myName, myaddress, "pic1", "PA", true, "manager", password);
//				 
//				 ArrayList<String> roles = new ArrayList<>();
//				 roles.add("manager");
////				 roles.add("MANAGER");
//				 //roles.add("ROLE_MANAGER");	
//				 //roles.add("ROLE_ADMIN");
//				 appUserDo.setRoles(roles);					 
//				 return appUserDo;
//		  }	 else if(username.equalsIgnoreCase("clerk") || username.equalsIgnoreCase("clerk@test.com")) {
//				 long longValue = 1;
////				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
////				 appUserDo = new UserDO(longValue, "Clerk First", "Clerk Last", "PA", "clerk","clerk@testmail.com", password);
//				 Name myName = new Name("Clerk F", "M", "Clerk L");			 
//				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//				 appUserDo = new UserDO(longValue, "clerk@testmail.com", myName, myaddress, "pic1", "NJ", true, "clerk", password);
//				 
//				 ArrayList<String> roles = new ArrayList<>();
////				 roles.add("ROLE_CLERK");			 
//				 roles.add("clerk");
//				 appUserDo.setRoles(roles);					 
//				 return appUserDo;
//		  }	else if(username.equalsIgnoreCase("cashier") || username.equalsIgnoreCase("cashier@test.com")) {
//				 long longValue = 1;
////				 appUserDo = new UserDO(longValue , "adamadam", "venkat","adamadam@testmail.com","adamadam");
////				 appUserDo = new UserDO(longValue, "Cashier First", "Cashier Last", "PA", "cashier","cashier@testmail.com", password);
//				 Name myName = new Name("Cashier F", "M", "cashier L");			 
//				 Address myaddress = new Address("1111 John St", "", "Edison", "NJ", "08820");			 
//				 appUserDo = new UserDO(longValue, "cashier@testmail.com", myName, myaddress, "pic1", "NJ", true, "cashier", password);
//				 
//				 ArrayList<String> roles = new ArrayList<>();
//				 roles.add("ROLE_Cashier");			 
//				 appUserDo.setRoles(roles);					 
//				 return appUserDo;
//		  }						  
//		 
//		
//		List<PartnerVO> lstObj1 = partnerDAO.getAllPartners();
//		PartnerVO tmpElement = null;	    
//	    for (int index=0; index < lstObj1.size(); index++) {
//            tmpElement = lstObj1.get(index);
//            tmpElement.setPartnerPwd(strConvert(tmpElement.getPartnerPwd()));
//            tmpElement = null;
//        }
//		return lstObj1;	    
		
		
	}
//	
//	@Transactional(readOnly = true)
//	public PartnerInfoBean getPartnerInfo(int id) {
//		return  partnerDAO.getPartnerInfo(id);
//	}
//	
//	@Transactional
//	public String updatePartner(PartnerInfoBean partnerInfoBean, String wsAdminUser) {
//		  return partnerDAO.updatePartnerInfo(partnerInfoBean, wsAdminUser);
//	}
//	
//	private String strConvert(String strTemp) {
//		if(strTemp==null) {
//			strTemp = "";
//		}
//		return Base64.getEncoder().encodeToString(strTemp.getBytes());		
//	}

}
