package com.skilldistillery.media.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class ClubTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Club club;

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
		club = em.find(Club.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}
	
	@Test
	void test_Club_basic_mappings() {
		assertNotNull(club);
		assertEquals("TSwizz Fanclub", club.getName());
		assertEquals("#Swifties4Lyfe", club.getDescription());
	}
	
	@Test
	void test_Club_Playlist_ManyToMany_mapping() {
		assertNotNull(club.getClubPlaylists());
		assertTrue(club.getClubPlaylists().size() > 0);
	}
	
	@Test
	void test_Club_User_ManyToOne_mapping() {
		assertNotNull(club.getUser());
		assertEquals("test", club.getUser().getUsername());
	}
	
	@Test
	void test_Club_User_ManyToMany_mapping() {
		assertNotNull(club.getClubUsers());
		assertTrue(club.getClubUsers().size() > 0);
	}


}
