package com.skilldistillery.media.services;

import java.util.List;

import com.skilldistillery.media.entities.Club;
import com.skilldistillery.media.entities.Playlist;
import com.skilldistillery.media.entities.User;

public interface ClubService {

	public List<Club> index(String username);
	
	public Club show(String username, int cid);
	
	public List<Club> showByUser(String username);
	
	public Club create(String username, Club club);

	Club update(String username, int cid, Club club);
	
	Club joinClub(String username, int clubId);
	
	public void leaveClub(String username, int clubId);

	List<User> getClubUsers(int clubId);
	
	List<Playlist> getClubPlaylist(int clubId);
	
	Club addPlaylistToClub(int clubId, int pid, String username);
	
	Club removePlaylistFromClub(int clubId, int pid, String username);
	
	
	
	boolean destroy(String username, int cid);
	
	
}
