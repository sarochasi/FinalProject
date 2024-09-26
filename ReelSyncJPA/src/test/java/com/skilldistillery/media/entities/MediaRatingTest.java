//package com.skilldistillery.media.entities;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//import org.junit.jupiter.api.AfterAll;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.EntityManagerFactory;
//import jakarta.persistence.Persistence;
//
//class MediaRatingTest {
//
//	private static EntityManagerFactory emf;
//	private EntityManager em;
//	private MediaRating mediaRating;
//
//	@BeforeAll
//	static void setUpBeforeClass() throws Exception {
//		emf = Persistence.createEntityManagerFactory("ReelSyncJPA");
//	}
//
//	@AfterAll
//	static void tearDownAfterClass() throws Exception {
//		emf.close();
//	}
//
//	@BeforeEach
//	void setUp() throws Exception {
//		em = emf.createEntityManager();
//		mediaRating = em.find(MediaRating.class, 1);
//	}
//
//	@AfterEach
//	void tearDown() throws Exception {
//		em.close();
//	}
//	
//	@Test
//	void test_Media_basic_mappings() {
//		assertNotNull(mediaRating);
//		assertEquals(5, mediaRating.getRating());
//		assertEquals("Very cool", mediaRating.getRatingRemark());
//	}
//
//}
