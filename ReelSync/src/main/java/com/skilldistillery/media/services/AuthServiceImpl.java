package com.skilldistillery.media.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.media.entities.User;
import com.skilldistillery.media.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public User register(User user) {
		//encode pw, set enabled, etc
		user.setPassword(encoder.encode(user.getPassword()));
		user.setEnabled(true);
		
		userRepo.saveAndFlush(user);
		return user;
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}

	@Override
	public User update(String username, User user) {
		User updatedUser = userRepo.findByUsername(username);
		if(updatedUser != null) {
			updatedUser.setUsername(user.getUsername());
			updatedUser.setPassword(user.getPassword());
			updatedUser.setEnabled(user.getEnabled());
			updatedUser.setRole(user.getRole());
			updatedUser.setImageUrl(user.getImageUrl());
			updatedUser.setBiography(user.getBiography());
			userRepo.saveAndFlush(updatedUser);
		}
		return updatedUser;
	}

	
	
	

}
