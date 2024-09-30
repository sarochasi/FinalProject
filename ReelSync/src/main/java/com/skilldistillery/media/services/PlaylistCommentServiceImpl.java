package com.skilldistillery.media.services;

import java.util.List;
import java.util.Optional;

import javax.xml.stream.events.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.media.entities.Media;
import com.skilldistillery.media.entities.Playlist;
import com.skilldistillery.media.entities.PlaylistComment;
import com.skilldistillery.media.entities.User;
import com.skilldistillery.media.repositories.PlaylistCommentRepository;
import com.skilldistillery.media.repositories.PlaylistRepository;
import com.skilldistillery.media.repositories.UserRepository;

@Service
public class PlaylistCommentServiceImpl implements PlaylistCommentService {
	
	@Autowired
	private PlaylistCommentRepository commentRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PlaylistRepository playlistRepo;

	@Override
	public List<PlaylistComment> index(String username) {
		User user = userRepo.findByUsername(username);
		
		if(user != null) {
			return commentRepo.findByEnabledTrue();
		}
		return null;
	}

	@Override
	public PlaylistComment show(String username, int cid) {
		User user = userRepo.findByUsername(username);
		Optional<PlaylistComment> commentOpt = commentRepo.findById(cid);
		PlaylistComment comment = null;
		
		if(user != null && commentOpt.isPresent() && commentOpt.get().getEnabled()) {
			comment = commentOpt.get();
		}
		return comment;
	}
	
	@Override
	public PlaylistComment create(String username, PlaylistComment comment, int pid) {
		User user = userRepo.findByUsername(username);
		Playlist playlist = playlistRepo.findByIdAndUser_Username(pid, username);
		comment.setUser(user);
		comment.setPlaylist(playlist);
		comment.setEnabled(true);
		playlist.getPlaylistComments().add(comment);
		commentRepo.saveAndFlush(comment);
		return comment;
	}

	@Override
	public PlaylistComment update(String username, int pid, PlaylistComment comment) {
		PlaylistComment updatedComment = commentRepo.findByIdAndUser_Username(pid, username);
		if (updatedComment != null) {
			updatedComment.setContent(comment.getContent());
			updatedComment.setReplies(comment.getReplies());
			commentRepo.saveAndFlush(updatedComment);
		}
		return updatedComment;
	}

	@Override
	public boolean destroy(String username, int mid) {
		boolean deleted = false;
		PlaylistComment toBeDeleted = commentRepo.findByIdAndUser_Username(mid, username);
		if(toBeDeleted != null) {
			toBeDeleted.setEnabled(false);
			commentRepo.saveAndFlush(toBeDeleted);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public List<PlaylistComment> getCommentsByPlaylistId(int pid) {
		return commentRepo.findByPlaylistId(pid);
	}
}
