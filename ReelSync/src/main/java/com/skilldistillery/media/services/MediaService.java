package com.skilldistillery.media.services;

import java.util.List;

import com.skilldistillery.media.entities.Media;

public interface MediaService {
	public List<Media> index(String username);
	
	public Media show(String username, int mid);
	
	public Media create(String username, Media media);
	
	public Media update(String username, int mid, Media media);
	
	public boolean destroy(String username, int mid);
}
