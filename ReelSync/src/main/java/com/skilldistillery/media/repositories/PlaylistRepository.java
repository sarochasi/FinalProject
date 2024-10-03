package com.skilldistillery.media.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.media.entities.Playlist;
import com.skilldistillery.media.entities.User;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer>{

	Set<Playlist> findByUser_Username(String username);
	Set<Playlist> findByUser_UsernameAndEnabledTrue(String username);
	Playlist findByIdAndUser_Username(int pid, String username);
	Set<Playlist> findByUser_UsernameAndNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrTags_NameContainingIgnoreCase(String username, String name, String description, String tag);    
	Set<Playlist> findByEnabledTrue();
    Set<Playlist> findByPlaylistUsersContainsAndEnabledTrue(User user);
    Set<Playlist> findByPlaylistUsers_UsernameAndEnabledTrue(String username);
    Set<Playlist> findByPublishedTrue();
}
