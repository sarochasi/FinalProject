package com.skilldistillery.media.entities;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class MediaTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Media media;

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
		media = em.find(Media.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}
	
	@Test
	void test_Media_basic_mappings() {
		assertNotNull(media);
		assertEquals("Test", media.getName());
		assertEquals("test", media.getDescription());
		assertEquals(Boolean.TRUE, media.getEnabled());
	}

	@Test
	void test_Media_User_ManyToOne_mapping() {
		assertNotNull(media.getUser());
		assertEquals("test", media.getUser().getUsername());
	}
	
	@Test
	void test_Media_User_ManyToMany_mapping() {
		assertNotNull(media.getUsers());
		assertTrue(media.getUsers().size() > 0);
	}
	
	@Test
	void test_Media_MediaComment_OneToMany_mapping() {
		assertNotNull(media.getMediaComments());
		assertTrue(media.getMediaComments().size() > 0);
	}
	
	@Test
	void test_Media_Tag_ManyToMany_mapping() {
		assertNotNull(media.getTags());
		assertTrue(media.getTags().size() > 0);
	}
	
	@Test
	void test_Media_Playlist_ManyToMany_mapping() {
		assertNotNull(media.getPlaylists());
		assertTrue(media.getPlaylists().size() > 0);
	}
	
	

}
