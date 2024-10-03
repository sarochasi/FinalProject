package com.skilldistillery.media.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.media.entities.Playlist;
import com.skilldistillery.media.entities.User;
import com.skilldistillery.media.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin({"*", "http://localhost/"})
public class AuthController {
	
  @Autowired
  private AuthService authService;
  
  @PostMapping("register")
	public User register(@RequestBody User user, HttpServletResponse res) {
	  if (user == null) {
	     res.setStatus(400);
	     return null;
	  }
	  user = authService.register(user);
	  return user;
	}
	 
	@GetMapping("authenticate")
	public User authenticate(Principal principal, HttpServletResponse res) {
	  if (principal == null) { // no Authorization header sent
	     res.setStatus(401);
	     res.setHeader("WWW-Authenticate", "Basic");
	     return null;
	  }
	  return authService.getUserByUsername(principal.getName());
	}
	
	@PutMapping("users/{userId}")
	public User update(HttpServletRequest req, HttpServletResponse res, @PathVariable("userId") int userId, @RequestBody User user, Principal principal) {
		User updatedUser = null;
		try {
			updatedUser = authService.update(principal.getName(), user);
			if (updatedUser == null) {
				res.setStatus(401);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		
		return updatedUser;
	}
  
}
