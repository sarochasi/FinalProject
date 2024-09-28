package com.skilldistillery.media.services;

import com.skilldistillery.media.entities.User;

public interface AuthService {
	
	public User register(User user);
	public User getUserByUsername(String username);
	public User registerAdmin(User user);

}
