package com.skilldistillery.media.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.media.entities.Media;
import com.skilldistillery.media.entities.Playlist;
import com.skilldistillery.media.entities.User;
import com.skilldistillery.media.repositories.MediaRepository;
import com.skilldistillery.media.repositories.PlaylistRepository;
import com.skilldistillery.media.repositories.UserRepository;

@Service
public class PlaylistServiceImpl implements PlaylistService {

	@Autowired
	private PlaylistRepository playlistRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private MediaRepository mediaRepo;

	@Override
	public Set<Playlist> index(String username) {
		return playlistRepo.findByUser_Username(username);
	}

	@Override
	public Playlist show(String username, int pid) {
		return playlistRepo.findByIdAndUser_Username(pid, username);
	}
	
	@Override
	public Set<Playlist> showByKeyword(String username, String nameKeyword, String descriptionKeyword) {
		return playlistRepo.findByUser_UsernameAndNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(username, nameKeyword, descriptionKeyword);
	}

	@Override
	public Playlist create(String username, Playlist playlist) {
		User user = userRepo.findByUsername(username);
		playlist.setUser(user);
		playlist.setEnabled(true);
		playlistRepo.saveAndFlush(playlist);
		return playlist;
	}

	@Override
	public Playlist update(String username, int pid, Playlist playlist) {
		Playlist updatedPlaylist = playlistRepo.findByIdAndUser_Username(pid, username);
		if (updatedPlaylist != null) {
			updatedPlaylist.setName(playlist.getName());
			updatedPlaylist.setDescription(playlist.getDescription());
			updatedPlaylist.setImageUrl(playlist.getImageUrl());
			updatedPlaylist.setEnabled(playlist.getEnabled());
			updatedPlaylist.setPublished(playlist.getPublished());
			playlistRepo.saveAndFlush(updatedPlaylist);
		}
		return updatedPlaylist;
	}

	@Override
	public boolean destroy(String username, int pid) {
		boolean deleted = false;
		Playlist managedPlaylist = playlistRepo.findByIdAndUser_Username(pid, username);
		if (managedPlaylist != null) {
			managedPlaylist.setEnabled(Boolean.FALSE);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public Playlist addMedia(String username, int pid, int mid) {
		Optional<Playlist> optPlaylist = playlistRepo.findById(pid); 
		Optional<Media> optMedia = mediaRepo.findById(mid); 
		Playlist playlist = null;
		if (optPlaylist.isPresent() && optMedia.isPresent()) { 
			playlist = optPlaylist.get(); 
			Media media = optMedia.get(); 
			playlist.getMedia().add(media);  
		} return playlist; 
	}
}
