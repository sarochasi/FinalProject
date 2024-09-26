package com.skilldistillery.media.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class MediaRatingId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "media_id")
	private int mediaId;

	@Column(name = "user_id")
	private int userId;
	
	

	public MediaRatingId() {
		super();
	}

	public int getMediaId() {
		return mediaId;
	}

	public void setMediaId(int mediaId) {
		this.mediaId = mediaId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(mediaId, userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MediaRatingId other = (MediaRatingId) obj;
		return mediaId == other.mediaId && userId == other.userId;
	}

	@Override
	public String toString() {
		return "MediaRatingId [mediaId=" + mediaId + ", userId=" + userId + "]";
	}
	
	
	
	
}
