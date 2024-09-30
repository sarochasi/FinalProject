package com.skilldistillery.media.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.media.entities.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer>{

	Set<Playlist> findByUser_Username(String username);
	Set<Playlist> findByUser_UsernameAndEnabledTrue(String username);
	Playlist findByIdAndUser_Username(int pid, String username);
    Set<Playlist> findByUser_UsernameAndNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String username, String nameKeyword, String descriptionKeyword);
    Set<Playlist> findByEnabledTrue();
    Set<Playlist> findByFavoriteTrue();
}
