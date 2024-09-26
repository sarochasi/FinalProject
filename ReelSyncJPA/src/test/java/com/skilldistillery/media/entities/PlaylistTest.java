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

class PlaylistTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Playlist playlist;

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
		playlist = em.find(Playlist.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}
	
	@Test
	void test_Playlist_basic_mappings() {
		assertNotNull(playlist);
		assertEquals("My Playlist", playlist.getName());
		assertEquals("Road trip jams", playlist.getDescription());
	}


}
