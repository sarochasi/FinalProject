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

import com.skilldistillery.media.entities.Playlist;
import com.skilldistillery.media.entities.Tag;
import com.skilldistillery.media.services.TagService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class TagController {

	@Autowired
	private TagService tagService;
	
	@GetMapping("tags")
	public List<Tag> index(HttpServletRequest req, HttpServletResponse res) {
		return tagService.index();
	}
	
	@GetMapping("tags/{name}")
	public Tag show(HttpServletRequest req, HttpServletResponse res, @PathVariable("name") String name) {
		Tag tag = tagService.show(name);
		if(tag == null) {
			res.setStatus(404);
		}
		return tag;
	}
	
	@PostMapping("tags")
	public Tag create(HttpServletRequest req, HttpServletResponse res, @RequestBody Tag tag) {
		Tag createdTag = null;
		try {
			createdTag = tagService.create(tag);
			if (createdTag != null) {
				res.setStatus(201);
				res.setHeader("location", req.getRequestURL().append("/").append(createdTag.getId()).toString());
			} else {
				res.setStatus(401);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		return createdTag;
	}
	
	@PutMapping("tags/{tid}")
	public Tag update(HttpServletRequest req, HttpServletResponse res, @PathVariable("tid") int tid, @RequestBody Tag tag) {
		Tag updatedTag = null;
		try {
			updatedTag = tagService.update(tid, tag);
			if (updatedTag == null) {
				res.setStatus(401);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		
		return updatedTag;
	}
	
	@DeleteMapping("tags/{tid}")
	public void destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("tid") int tid) {
		
		try {
			boolean result = tagService.destroy(tid);
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
