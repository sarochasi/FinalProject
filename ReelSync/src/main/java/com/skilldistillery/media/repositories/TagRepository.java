package com.skilldistillery.media.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.media.entities.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer>{

	Tag findByName(String name);
}
