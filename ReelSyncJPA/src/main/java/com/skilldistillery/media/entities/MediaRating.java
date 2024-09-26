package com.skilldistillery.media.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "media_rating")
public class MediaRating {
	
	@EmbeddedId
	private MediaRatingId id;
	
	private Integer rating;
	
	@Column(name="created_at")
	private LocalDateTime createdAt;
	
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
	@Column(name = "rating_remark")
	private String ratingRemark;
	
	@ManyToOne
	@JoinColumn(name = "media_id")
	@MapsId(value = "mediaId")
	private Media media;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	@MapsId(value = "userId")
	private User user;

	public MediaRating() {
		super();
	}

	public MediaRatingId getId() {
		return id;
	}

	public void setId(MediaRatingId id) {
		this.id = id;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
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

	public void setRating(Integer rating) {
		this.rating = rating;
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
		MediaRating other = (MediaRating) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "MediaRating [id=" + id + ", rating=" + rating + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
				+ ", ratingRemark=" + ratingRemark + "]";
	}

	
	
}
