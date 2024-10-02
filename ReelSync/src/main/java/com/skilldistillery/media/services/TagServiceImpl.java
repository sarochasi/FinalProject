package com.skilldistillery.media.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.media.entities.Media;
import com.skilldistillery.media.entities.Playlist;
import com.skilldistillery.media.entities.Tag;
import com.skilldistillery.media.repositories.PlaylistRepository;
import com.skilldistillery.media.repositories.TagRepository;
import com.skilldistillery.media.repositories.UserRepository;

@Service
public class TagServiceImpl implements TagService {

	@Autowired
	private TagRepository tagRepo;

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PlaylistRepository playlistRepo;

	@Override
	public List<Tag> index() {
		return tagRepo.findAll();
	}

	@Override
	public Tag show(String name) {
		return tagRepo.findByName(name);
	}

	@Override
	public Tag create(Tag tag) {
		if (tag != null) {
			return tagRepo.saveAndFlush(tag);
		}
		return tag;
	}

	@Override
	public Tag update(int tid, Tag tag) {
		Optional<Tag> optTag = tagRepo.findById(tid);
		Tag updated = null;
		if (optTag.isPresent()) {
			updated = optTag.get();
			updated.setName(tag.getName());
		}
		return updated;
	}

	@Override
	public boolean destroy(int tid) {
		boolean deleted = false;
		Optional<Tag> optTag = tagRepo.findById(tid);
		Tag toBeDeleted = null;
		if (optTag.isPresent()) {
			toBeDeleted = optTag.get();
			tagRepo.delete(toBeDeleted);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public Tag addToPlaylist(int pid, int tid) {
		Optional<Playlist> optPlaylist = playlistRepo.findById(pid);
		Optional<Tag> optTag = tagRepo.findById(tid);
		Tag tag = null;
		if (optPlaylist.isPresent() && optTag.isPresent()) { 
			Playlist playlist = optPlaylist.get(); 
			tag = optTag.get(); 
			tag.getPlaylists().add(playlist);
			playlist.getTags().add(tag);
			playlistRepo.saveAndFlush(playlist);
		} return tag; 
	}

}
