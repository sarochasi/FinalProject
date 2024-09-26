package com.skilldistillery.media.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String username;
	private String password;
	private Boolean enabled;
	private String role;
	@Column(name = "image_url")
	private String imageUrl;
	private String biography;
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(name="favorite_media",joinColumns = @JoinColumn(name="user_id")
	, inverseJoinColumns = @JoinColumn(name="media_id"))
	private List<Media> favoriteMedia;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<MediaComment> mediaComments;
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(name="favorite_playlist",joinColumns = @JoinColumn(name="user_id")
	, inverseJoinColumns = @JoinColumn(name="playlist_id"))
	private List<Playlist> favoritePlaylists;
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<Playlist> playlists;
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<PlaylistRating> playlistRatings;
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<MediaRating> mediaRatings;
	
	
	
	public User() { }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getBiography() {
		return biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
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

	public List<Media> getFavoriteMedia() {
		return favoriteMedia;
	}

	public void setFavoriteMedia(List<Media> favoriteMedia) {
		this.favoriteMedia = favoriteMedia;
	}

	public List<MediaComment> getMediaComments() {
		return mediaComments;
	}

	public void setMediaComments(List<MediaComment> mediaComments) {
		this.mediaComments = mediaComments;
	}
	
	public List<Playlist> getFavoritePlaylists() {
		return favoritePlaylists;
	}

	public void setFavoritePlaylists(List<Playlist> favoritePlaylists) {
		this.favoritePlaylists = favoritePlaylists;
	}
	
	public List<PlaylistRating> getPlaylistRatings() {
		return playlistRatings;
	}

	public void setPlaylistRatings(List<PlaylistRating> playlistRatings) {
		this.playlistRatings = playlistRatings;
	}

	public List<MediaRating> getMediaRatings() {
		return mediaRatings;
	}

	public void setMediaRatings(List<MediaRating> mediaRatings) {
		this.mediaRatings = mediaRatings;
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
		User other = (User) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", enabled=" + enabled
				+ ", role=" + role + ", imageUrl=" + imageUrl + ", biography=" + biography + ", createdAt=" + createdAt
				+ ", updatedAt=" + updatedAt + "]";
	}
}
