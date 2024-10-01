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

class UserTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private User user;

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
		user = em.find(User.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}
	
	@Test
	void test_User_basic_mappings() {
		assertNotNull(user);
		assertEquals("test", user.getUsername());
		assertEquals("standard", user.getRole());
		assertEquals(Boolean.TRUE, user.getEnabled());
	}
	
	@Test
	void test_Media_User_ManyToMany_mapping() {
		assertNotNull(user.getFavoriteMedia());
		assertTrue(user.getFavoriteMedia().size() > 0);
	}
	
	@Test
	void test_User_MediaComment_OneToMany_mapping() {
		assertNotNull(user.getMediaComments());
		assertTrue(user.getMediaComments().size() > 0);
	}
	
	@Test
	void test_User_Playlist_ManyToMany_mapping() {
		assertNotNull(user.getFavoritePlaylists());
		assertTrue(user.getFavoritePlaylists().size() > 0);
	}
	
	@Test
	void test_User_Club_OneToMany_mapping() {
		assertNotNull(user.getClubs());
		assertTrue(user.getClubs().size() > 0);
	}
	
	@Test
	void test_User_Club_ManyToMany_mapping() {
		assertNotNull(user.getClubs());
		assertTrue(user.getClubs().size() > 0);
	}


}
