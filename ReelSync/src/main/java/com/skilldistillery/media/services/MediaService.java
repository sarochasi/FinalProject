package com.skilldistillery.media.services;

import java.util.List;
import java.util.Set;

import com.skilldistillery.media.entities.Media;

public interface MediaService {
	public Set<Media> findByUser_Username(String username);
	
	public Media show(String username, int mid);
	
	public Set<Media> showByPlaylist(int pid);
	
	public Media create(String username, Media media);
	
	public Media update(String username, int mid, Media media);
	
	public boolean destroy(String username, int mid);
		
}
