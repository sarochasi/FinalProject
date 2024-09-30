package com.skilldistillery.media.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.media.entities.PlaylistComment;

public interface PlaylistCommentRepository extends JpaRepository<PlaylistComment, Integer>{

	List<PlaylistComment> findByUser_Username(String username);
	PlaylistComment findByIdAndUser_Username(int pid, String username);
	List<PlaylistComment> findByEnabledTrue();

}
