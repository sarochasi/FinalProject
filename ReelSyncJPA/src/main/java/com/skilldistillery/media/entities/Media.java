package com.skilldistillery.media.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Media {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "source_url")
	private String sourceUrl;
	
	private String name;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
	private String description;
	
	private Boolean enabled;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn( name = "user_id")
	private User user;
	
	@JsonIgnore
	@ManyToMany(mappedBy = "favoriteMedia")
	private List<User> users;
	
	@JsonIgnore
	@OneToMany(mappedBy = "media")
	private List<MediaComment> mediaComments;
	
	@JsonIgnore
	@OneToMany(mappedBy = "media")
	private List<MediaRating> mediaRatings;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name="tag_has_media",joinColumns = @JoinColumn(name="media_id")
	, inverseJoinColumns = @JoinColumn(name="tag_id"))
	private List<Tag> tags;
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(name="media_has_playlist",joinColumns = @JoinColumn(name="media_id")
	, inverseJoinColumns = @JoinColumn(name="playlist_id"))
	private List<Playlist> playlists;

	
	public Media() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSourceUrl() {
		return sourceUrl;
	}
	public void setSourceUrl(String sourceUrl) {
		this.sourceUrl = sourceUrl;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public List<MediaComment> getMediaComments() {
		return mediaComments;
	}
	public void setMediaComments(List<MediaComment> mediaComments) {
		this.mediaComments = mediaComments;
	}

	public List<MediaRating> getMediaRatings() {
		return mediaRatings;
	}
	public void setMediaRatings(List<MediaRating> mediaRatings) {
		this.mediaRatings = mediaRatings;
		}

	public List<Tag> getTags() {
		return tags;
	}
	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}
	public List<Playlist> getPlaylists() {
		return playlists;
	}
	public void setPlaylists(List<Playlist> playlists) {
		this.playlists = playlists;

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
		Media other = (Media) obj;
		return id == other.id;
	}
	@Override
	public String toString() {
		return "Media [id=" + id + ", name=" + name + "]";
	}

}
