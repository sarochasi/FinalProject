package com.skilldistillery.media.controllers;

import java.security.Principal;
import java.util.List;
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
import com.skilldistillery.media.entities.Tag;
import com.skilldistillery.media.services.MediaService;
import com.skilldistillery.media.services.PlaylistService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class PlaylistController {

	@Autowired
	private PlaylistService playlistService;
	
	@Autowired
	private MediaService mediaService;
	
	@GetMapping("playlists/all")
	public List<Playlist> showAll(Principal principal){
		return playlistService.showAll(principal.getName());
	}
	
	@GetMapping("playlists")
	public Set<Playlist> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		return playlistService.index(principal.getName());
	}

	@GetMapping("playlists/{pid}")
	public Playlist show(HttpServletRequest req, HttpServletResponse res, @PathVariable("pid") int pid, Principal principal) {
		Playlist playlist = playlistService.show(principal.getName(), pid);
		if(playlist == null) {
			res.setStatus(404);
		}
		return playlist;
	}
	
	@GetMapping("playlists/search/{keyword1}/{keyword2}/{keyword3}")
	public Set<Playlist> showByKeyword(HttpServletRequest req, HttpServletResponse res, Principal principal, @PathVariable("keyword1") String keyword1, @PathVariable("keyword2") String keyword2, @PathVariable("keyword3") String keyword3) {
		Set<Playlist> playlists = playlistService.showByKeyword(principal.getName(),keyword1, keyword2, keyword3);
		System.out.println(playlists);
		if(playlists == null) {
			res.setStatus(404);
		}
		return playlists;
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
		
	@PostMapping("playlists/{pid}/media/{mid}")
	public Playlist addMedia(HttpServletRequest req, HttpServletResponse res, @PathVariable("mid") int mid, @PathVariable("pid") int pid, Principal principal) {
		Playlist managedPlaylist = null;
		try {
			managedPlaylist = playlistService.addMedia(principal.getName(), pid, mid);
			if (managedPlaylist != null) {
				res.setStatus(201);
				res.setHeader("location", req.getRequestURL().append("/").append(managedPlaylist.getId()).toString());
			} else {
				res.setStatus(401);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		
		return managedPlaylist;
	}
	
	@PostMapping("playlists/{pid}/favorite")
	public Playlist addToFavorites(HttpServletRequest req, HttpServletResponse res, @PathVariable("pid") int pid, Principal principal) {
	    Playlist playlist = playlistService.addToFavorites(principal.getName(), pid);
	    if (playlist == null) {
	        res.setStatus(404);
	    } else {
	        res.setStatus(201);
	        res.setHeader("location", req.getRequestURL().toString());
	    }
	    return playlist;
	}
	
	@DeleteMapping("playlists/{pid}/favorite")
	public void removeFromFavorites(HttpServletRequest req, HttpServletResponse res, @PathVariable("pid") int pid, Principal principal) {
		try {
			playlistService.removeFromFavorites(principal.getName(), pid);
			res.setStatus(204);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
	
	@GetMapping("playlists/favorite")
	public Set<Playlist> getFavorites(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Set<Playlist> favorites = playlistService.getFavorites(principal.getName());
		return favorites;
	}


	@PutMapping("playlists/{pid}")
	public Playlist update(HttpServletRequest req, HttpServletResponse res, @PathVariable("pid") int pid, @RequestBody Playlist playlist, Principal principal) {
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
