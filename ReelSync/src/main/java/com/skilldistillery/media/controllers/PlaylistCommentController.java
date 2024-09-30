package com.skilldistillery.media.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.media.entities.PlaylistComment;
import com.skilldistillery.media.services.PlaylistCommentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost/"})
public class PlaylistCommentController {

	@Autowired
	private PlaylistCommentService commentService;
	
	@GetMapping("playlistcomments")
	public List<PlaylistComment> index(Principal principal, HttpServletRequest req, HttpServletResponse res){
		return commentService.index(principal.getName());
		
	}
	
	@GetMapping("playlistcomments/{cid}")
	public PlaylistComment show(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("cid") int cid) {
		PlaylistComment comment = commentService.show(principal.getName(), cid);
		if( comment == null) {
			res.setStatus(404);
		}
		return comment;
	}
	
	@PostMapping({"playlists/{pid}/comments","playlists/{pid}/comments/"})
	public PlaylistComment create(@RequestBody PlaylistComment newComment, @PathVariable("pid") int pid, Principal principal, HttpServletRequest req, HttpServletResponse res) {
		try {
			newComment = commentService.create(principal.getName(), newComment, pid);
			res.setStatus(201);
			res.setHeader("Location", req.getRequestURL() +"/" + newComment.getId());
		}catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return newComment; 
	}
	
	@PutMapping("comments/{cid}")
	public PlaylistComment update(Principal principal, HttpServletRequest req, 
			HttpServletResponse res,
			@PathVariable("cid") int cid,
			@RequestBody PlaylistComment comment) {
		PlaylistComment updatedComment = null;
		try {
			updatedComment = commentService.update(principal.getName(), cid, comment);
			if(updatedComment == null) {
				res.setStatus(404);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return updatedComment;
	}
	
	@DeleteMapping("comments/{cid}")
	public void destroy(Principal principal, HttpServletRequest req, HttpServletResponse res,@PathVariable("cid") int cid) {
		
		try {
			boolean result = commentService.destroy(principal.getName(), cid);
			if (result) {
				res.setStatus(200);
			} else {
				res.setStatus(400);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
	}
}
