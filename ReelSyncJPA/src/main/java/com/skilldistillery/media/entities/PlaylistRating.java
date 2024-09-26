package com.skilldistillery.media.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name="playlist_rating")
public class PlaylistRating {

	@EmbeddedId
	private PlaylistRatingId id;
	
	private Integer rating;
	
	@CreationTimestamp
	@Column(name="created_at")
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name="updated_at")
	private LocalDateTime updatedAt;
	
	@Column(name="rating_remark")
	private String ratingRemark;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	@MapsId("userId")
	private User user;
	
	public PlaylistRating() { }
	
	public PlaylistRatingId getId() {
		return id;
	}

	public void setId(PlaylistRatingId id) {
		this.id = id;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getRatingRemark() {
		return ratingRemark;
	}

	public void setRatingRemark(String ratingRemark) {
		this.ratingRemark = ratingRemark;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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
		PlaylistRating other = (PlaylistRating) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "PlaylistRating [id=" + id + ", rating=" + rating + ", createdAt=" + createdAt + ", updatedAt="
				+ updatedAt + ", ratingRemark=" + ratingRemark + "]";
	}
}
