package com.skilldistillery.media.services;

import java.util.Set;

import com.skilldistillery.media.entities.Playlist;

public interface PlaylistService {

	 public Set<Playlist> index(String username);

	 public Playlist show(String username, int pid);
	 
	 public Set<Playlist> showByKeyword(String username, String nameKeyword, String descriptionKeyword);

	 public Playlist create(String username, Playlist playlist);

	 public Playlist update(String username, int pid, Playlist playlist);

	 public boolean destroy(String username, int pid);
}
