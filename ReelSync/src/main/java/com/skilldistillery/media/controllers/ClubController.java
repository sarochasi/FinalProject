package com.skilldistillery.media.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.media.entities.Club;
import com.skilldistillery.media.entities.Media;
import com.skilldistillery.media.services.ClubService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost/"})
public class ClubController {
	
	@Autowired
	private ClubService clubService;
	
	@GetMapping("clubs")
	public List<Club> index(Principal principal){
		return clubService.index(principal.getName());
	}
	
	@GetMapping("clubs/{cid}")
	public Club show(Principal principal, HttpServletRequest req, 
		HttpServletResponse res, @PathVariable("cid") int cid) {
		Club club = clubService.show(principal.getName(), cid);
		if(club == null) {
			res.setStatus(404);
		}
		return club;
	}
	
	@PostMapping({"clubs", "clubs/"})
	public Club create(@RequestBody Club newClub, 
			Principal principal, HttpServletRequest req, 
			HttpServletResponse res) {
		try {
			newClub = clubService.create(principal.getName(), newClub);
			res.setStatus(201);
			res.setHeader("Location", req.getRequestURL() +"/" + newClub.getId());
		}catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return newClub; 
	}
	
	@PutMapping("clubs/{cid}")
	public Club update(Principal principal, HttpServletRequest req, 
			HttpServletResponse res,
			@PathVariable("cid") int cid,
			@RequestBody Club club) {
		Club updatedClub = null;
		try {
			updatedClub = clubService.update(principal.getName(), cid, club);
			if(updatedClub == null) {
				res.setStatus(404);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return updatedClub;
	}

}
