package com.skilldistillery.media.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.media.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	User findByUsername(String username);
	Set<User> findByRole(String role);

}
