package com.grokonez.jwtauthentication.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.grokonez.jwtauthentication.security.services.UserDetailsServiceImpl;

public class JwtAuthTokenFilter extends OncePerRequestFilter {

	@Autowired
	private JwtProvider tokenProvider;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthTokenFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		System.out.println("JwtAuthTokenFilter doFilterInternal 1 request =  " + request);
		System.out.println("JwtAuthTokenFilter doFilterInternal 1 request =  " + request);
		
		try {
			
			System.out.println("JwtAuthTokenFilter doFilterInternal 2 request =  " + request);

			String jwt = getJwt(request);
			System.out.println("JwtAuthTokenFilter doFilterInternal 3 jwt =  " + jwt);
			
			if (jwt != null && tokenProvider.validateJwtToken(jwt)) {
				String username = tokenProvider.getUserNameFromJwtToken(jwt);

				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
			
			System.out.println("JwtAuthTokenFilter doFilterInternal 4 jwt ===  " + jwt);
		} catch (Exception e) {
			logger.error("Can NOT set user authentication -> Message: {}", e);
			System.out.println("Catch JwtAuthTokenFilter doFilterInternal jwt =  " + e.getMessage());
			e.printStackTrace();
		}
		

		filterChain.doFilter(request, response);
	}

	private String getJwt(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			return authHeader.replace("Bearer ", "");
		}

		return null;
	}
}
