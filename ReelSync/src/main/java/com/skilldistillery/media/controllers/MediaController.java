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

import com.skilldistillery.media.entities.Media;
import com.skilldistillery.media.services.MediaService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost/"})
public class MediaController {
	
	@Autowired
	private MediaService mediaService;
	
	@GetMapping("media")
	public Set<Media> index(Principal principal, HttpServletRequest req, HttpServletResponse res){
		return mediaService.index(principal.getName());
		
	}
	
	@GetMapping("media/{mid}")
	public Media show(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("mid") int mid) {
		Media media = mediaService.show(principal.getName(), mid);
		if( media == null) {
			res.setStatus(404);
		}
		return media;
	}
	
	@PostMapping({"media","media/"})
	public Media create(@RequestBody Media newMedia, Principal principal, HttpServletRequest req, HttpServletResponse res) {
		try {
			newMedia = mediaService.create(principal.getName(), newMedia);
			res.setStatus(201);
			res.setHeader("Location", req.getRequestURL() +"/" + newMedia.getId());
		}catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return newMedia; 
	}
	
	@PutMapping("media/{mid}")
	public Media update(Principal principal, HttpServletRequest req, 
			HttpServletResponse res,
			@PathVariable("mid") int mid,
			@RequestBody Media media) {
		Media updatedMedia = null;
		try {
			updatedMedia = mediaService.update(principal.getName(), mid, media);
			if(updatedMedia == null) {
				res.setStatus(404);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return updatedMedia;
	}
	
	@DeleteMapping("media/{mid}")
	public void destroy(Principal principal, HttpServletRequest req, HttpServletResponse res,@PathVariable("mid") int mid) {
		
		try {
			boolean result = mediaService.destroy(principal.getName(), mid);
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
