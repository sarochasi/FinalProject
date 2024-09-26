package com.skilldistillery.media.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "media_comment")
public class MediaComment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String content;
	
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@ManyToOne
	@JoinColumn(name = "media_id")
	private Media media;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToMany(mappedBy = "reply")
	private List<MediaComment> replies;
	
	@ManyToOne
	@JoinColumn(name = "in_reply_to_id")
	private MediaComment reply;
	

	public MediaComment() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Media getMedia() {
		return media;
	}

	public void setMedia(Media media) {
		this.media = media;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<MediaComment> getReplies() {
		return replies;
	}

	public void setReplies(List<MediaComment> replies) {
		this.replies = replies;
	}

	public MediaComment getReply() {
		return reply;
	}

	public void setReply(MediaComment reply) {
		this.reply = reply;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MediaComment other = (MediaComment) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "MediaComment [id=" + id + ", content=" + content + ", createdAt=" + createdAt + "]";
	}
	
	
	
	

}
