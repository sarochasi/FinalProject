package com.skilldistillery.media.controllers;

import java.security.Principal;
import java.util.Set;

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

import com.skilldistillery.media.entities.Playlist;
import com.skilldistillery.media.services.PlaylistService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class PlaylistController {

	@Autowired
	private PlaylistService playlistService;
	
	@GetMapping("playlists")
	public Set<Playlist> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		return playlistService.index(principal.getName());
	}

	@GetMapping("playlists/{pid}")
	public Playlist show(HttpServletRequest req, HttpServletResponse res, @PathVariable("pid") int pid, Principal principal) {
		System.out.println(principal.getName() + " " + pid);
		Playlist playlist = playlistService.show(principal.getName(), pid);
		if(playlist == null) {
			res.setStatus(404);
		}
		return playlist;
	}

	@PostMapping("playlists")
	public Playlist create(HttpServletRequest req, HttpServletResponse res, @RequestBody Playlist playlist, Principal principal) {
		Playlist createdPlaylist = null;
		try {
			createdPlaylist = playlistService.create(principal.getName(), playlist);
			if (createdPlaylist != null) {
				res.setStatus(201);
				res.setHeader("location", req.getRequestURL().append("/").append(createdPlaylist.getId()).toString());
			} else {
				res.setStatus(401);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		
		return createdPlaylist;
	}

	@PutMapping("playlists/{pid}")
	public Playlist update(HttpServletRequest req, HttpServletResponse res, @PathVariable("pid") int pid, @RequestBody Playlist playlist, Principal principal) {
		System.out.println(playlist);
		Playlist updatedPlaylist = null;
		try {
			updatedPlaylist = playlistService.update(principal.getName(), pid, playlist);
			if (updatedPlaylist == null) {
				res.setStatus(401);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		
		return updatedPlaylist;
	}
	
	@DeleteMapping("playlists/{pid}")
	public void destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("pid") int pid, Principal principal) {
		
		try {
			boolean result = playlistService.destroy(principal.getName(), pid);
			if (result) {
				res.setStatus(204);
			} else {
				res.setStatus(400);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
	}
	
}
