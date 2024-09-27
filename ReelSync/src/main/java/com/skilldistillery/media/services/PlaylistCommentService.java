package com.skilldistillery.media.services;

import java.util.List;

import com.skilldistillery.media.entities.PlaylistComment;

public interface PlaylistCommentService {

public List<PlaylistComment> index(String username);
	
	public PlaylistComment show(String username, int cid);
	
	public PlaylistComment create(String username, PlaylistComment comment, int pid);
	
	public PlaylistComment update(String username, int cid, PlaylistComment comment);
	
	public boolean destroy(String username, int cid);
}
