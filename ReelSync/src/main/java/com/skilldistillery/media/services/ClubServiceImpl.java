package com.skilldistillery.media.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.media.entities.Club;
import com.skilldistillery.media.entities.User;
import com.skilldistillery.media.repositories.ClubRepository;
import com.skilldistillery.media.repositories.UserRepository;

@Service
public class ClubServiceImpl implements ClubService{
	
	@Autowired
	private ClubRepository clubRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<Club> index(String username) {
		User user = userRepo.findByUsername(username);
		
		if(user != null) {
			return clubRepo.findAll();
		}
		return null;
	}

	@Override
	public Club show(String username, int cid) {
		User user = userRepo.findByUsername(username);
		Optional<Club> clubOpt = clubRepo.findById(cid);
		Club club = null;
		if(user != null && clubOpt.isPresent()) {
			club = clubOpt.get();
		}
		return club;
	}

	@Override
	public List<Club> showByUser(String username) {
		return clubRepo.findByUser_Username(username);
	}
	
	@Override
	public Club create(String username, Club club) {
		User user = userRepo.findByUsername(username);
		if(user != null) {
			club.setUser(user);
			return clubRepo.saveAndFlush(club);
		}
		return null;
	}
	
	@Override
	public Club update(String username, int cid, Club club) {
		Club existing = clubRepo.findByIdAndUser_Username(cid, username);
		if(existing != null && club != null) {
			existing.setName(club.getName());
			existing.setDescription(club.getDescription());
			existing.setImageUrl(club.getImageUrl());
			existing.setCreatedAt(club.getCreatedAt());
			clubRepo.saveAndFlush(existing);
		}
		return existing;
	}
	
	
	

}
