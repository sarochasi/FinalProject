package com.skilldistillery.media.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.media.entities.Media;

public interface MediaRepository extends JpaRepository<Media, Integer>{
	
	Set<Media> findByUser_Username(String username);
	
	Media findByIdAndUser_Username(int mediaId, String username);
	
	List<Media> findByEnabledTrue();
	
	

}
