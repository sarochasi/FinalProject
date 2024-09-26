package com.skilldistillery.media.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.media.entities.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer>{

	Set<Playlist> findByUser_Username(String username);
	Playlist findByIdAndUser_Username(int pid, String username);

}
