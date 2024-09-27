package com.skilldistillery.media.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.media.entities.Media;
import com.skilldistillery.media.entities.User;
import com.skilldistillery.media.repositories.MediaRepository;
import com.skilldistillery.media.repositories.UserRepository;

@Service
public class MediaServiceImpl implements MediaService{
	
	@Autowired
	private MediaRepository mediaRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<Media> index(String username) {
		User user = userRepo.findByUsername(username);
		
		if(user != null) {
			return mediaRepo.findByEnabledTrue();
		}
		return null;
	}

	@Override
	public Media show(String username, int mid) {
		User user = userRepo.findByUsername(username);
		Optional<Media> mediaOpt = mediaRepo.findById(mid);
		Media media = null;
		if(user != null && mediaOpt.isPresent() && mediaOpt.get().getEnabled()) {
			media = mediaOpt.get();
		}
		return media;
	}

	@Override
	public Media create(String username, Media media) {
		User user = userRepo.findByUsername(username);
		  if (user != null) {
		    media.setUser(user);
		    return mediaRepo.saveAndFlush(media);
		  }
		  return null;
	}

	@Override
	public Media update(String username, int mid, Media media) {
		Media existing = mediaRepo.findByIdAndUser_Username(mid, username);
		if(existing != null && media != null) {
			existing.setSourceUrl(media.getSourceUrl());
			existing.setName(media.getName());
			existing.setCreatedAt(media.getCreatedAt());
			existing.setDescription(media.getDescription());
//			existing.setEnabled(media.getEnabled());
			mediaRepo.saveAndFlush(existing);
			
		}
		return existing;
	}

	@Override
	public boolean destroy(String username, int mid) {
		boolean deleted = false;
		Media toBeDeleted = mediaRepo.findByIdAndUser_Username(mid, username);
		if(toBeDeleted != null) {
			toBeDeleted.setEnabled(false);
			mediaRepo.saveAndFlush(toBeDeleted);
			deleted = true;
		}
		return deleted;
	}
	

	
}
