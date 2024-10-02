package com.skilldistillery.media.services;

import java.util.List;

import com.skilldistillery.media.entities.Tag;

public interface TagService {
	
	public List<Tag> index();
	
	public Tag show(String name);
	
	public Tag create(Tag tag);
	
	public Tag update(int tid, Tag tag);
	
	public boolean destroy(int tid);
	
	public Tag addToPlaylist(int pid, int tid);
}
