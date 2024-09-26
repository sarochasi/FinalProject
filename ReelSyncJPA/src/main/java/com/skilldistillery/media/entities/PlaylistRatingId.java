package com.skilldistillery.media.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class PlaylistRatingId implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="playlist_id")
	private int playlistId;
	
	public PlaylistRatingId() { }

	public PlaylistRatingId(int userId, int playlistId) {
		super();
		this.userId = userId;
		this.playlistId = playlistId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getPlaylistId() {
		return playlistId;
	}

	public void setPlaylistId(int playlistId) {
		this.playlistId = playlistId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(playlistId, userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PlaylistRatingId other = (PlaylistRatingId) obj;
		return playlistId == other.playlistId && userId == other.userId;
	}

	@Override
	public String toString() {
		return "PlaylistRatingId [userId=" + userId + ", playlistId=" + playlistId + "]";
	}
}
