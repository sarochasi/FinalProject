package com.skilldistillery.media.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.media.entities.Club;

public interface ClubRepository extends JpaRepository<Club, Integer>{

	List<Club> findByUser_Username(String username);
	Club findByIdAndUser_Username(int cid, String username);
	Set<Club> findByClubUsers_Username(String username);
	
}
