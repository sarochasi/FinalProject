//package com.skilldistillery.media.entities;
//
//import java.time.LocalDateTime;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.Table;
//
//@Entity
//@Table (name = "media_rating")
//public class MediaRating {
//	
//	private Integer rating;
//	
//	@Column(name ="created_at")
//	private LocalDateTime createdAt;
//	
//	@Column(name = "updated_at")
//	private LocalDateTime updatedAt;
//	
//	@Column(name = "rating_remark")
//	private String ratingRemark;
//
//	public MediaRating() {
//		super();
//	}
//
//	public Integer getRating() {
//		return rating;
//	}
//
//	public void setRating(Integer rating) {
//		this.rating = rating;
//	}
//
//	public LocalDateTime getCreatedAt() {
//		return createdAt;
//	}
//
//	public void setCreatedAt(LocalDateTime createdAt) {
//		this.createdAt = createdAt;
//	}
//
//	public LocalDateTime getUpdatedAt() {
//		return updatedAt;
//	}
//
//	public void setUpdatedAt(LocalDateTime updatedAt) {
//		this.updatedAt = updatedAt;
//	}
//
//	public String getRatingRemark() {
//		return ratingRemark;
//	}
//
//	public void setRatingRemark(String ratingRemark) {
//		this.ratingRemark = ratingRemark;
//	}
//
//	@Override
//	public String toString() {
//		return "MediaRating [rating=" + rating + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
//				+ ", ratingRemark=" + ratingRemark + "]";
//	}
//	
//	
//	
//
//}
