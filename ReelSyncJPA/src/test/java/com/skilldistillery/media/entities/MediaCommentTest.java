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

class MediaCommentTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private MediaComment mediaComment;

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
		mediaComment = em.find(MediaComment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}
	
	@Test
	void test_Media_basic_mappings() {
		assertNotNull(mediaComment);
		assertEquals("Not again!", mediaComment.getContent());
		
	}

	@Test
	void test_Comment_Media_ManyToOne_mapping() {
		assertNotNull(mediaComment.getMedia());
		assertEquals("Test", mediaComment.getMedia().getName());
	}
	
	@Test
	void test_Comment_User_ManyToOne_mapping() {
		assertNotNull(mediaComment.getUser());
		assertEquals("test", mediaComment.getUser().getUsername());
	}
	
	@Test
	void test_MediaComment_MediaComment_ManyToOne_mapping() {
		assertNotNull(mediaComment.getUser());
		assertEquals("Not again!", mediaComment.getReply().getContent());
	}
	
	@Test
	void test_MediaComment_MediaComment_OneToMany_mapping() {
		assertNotNull(mediaComment.getReplies());
		assertTrue(mediaComment.getReplies().size() > 0);
	}
}
