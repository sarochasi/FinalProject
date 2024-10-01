package com.skilldistillery.media.services;

import java.util.List;

import com.skilldistillery.media.entities.Club;

public interface ClubService {

	public List<Club> index(String username);
	
	public Club show(String username, int cid);
	
	public List<Club> showByUser(String username);
	
	public Club create(String username, Club club);

	Club update(String username, int cid, Club club);
}
