package com.skilldistillery.media.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class PlaylistRatingtest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private PlaylistRating playlistRating;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("ReelSyncJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		playlistRating = em.find(PlaylistRating.class, new PlaylistRatingId(1,1));
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}
	
	@Test
	void test_PlaylistRating_basic_mappings() {
		assertNotNull(playlistRating);
		assertEquals(5, playlistRating.getRating());
		assertEquals("10/10 would reccomend", playlistRating.getRatingRemark());
	}
	
	@Test
	void test_PlaylistRating_User_ManyToOne_relationship() {
		assertNotNull(playlistRating);
		assertEquals("test", playlistRating.getUser().getUsername());
		assertEquals("standard", playlistRating.getUser().getRole());
	}

}
