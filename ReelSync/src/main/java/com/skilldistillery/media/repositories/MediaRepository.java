package com.skilldistillery.media.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.media.entities.Media;
import com.skilldistillery.media.entities.Playlist;
import com.skilldistillery.media.entities.User;

public interface MediaRepository extends JpaRepository<Media, Integer>{
	
	Set<Media> findByUser_UsernameAndEnabledTrue(String username);
	
	Media findByIdAndUser_Username(int mediaId, String username);
	
	List<Media> findByEnabledTrue();
	
	Set<Media> findByPlaylists_IdAndEnabledTrue(int playlistId);
	
}
