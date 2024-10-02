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

@Entity
public class Club {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	private String description;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@CreationTimestamp
	@Column(name="created_at")
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name="updated_at")
	private LocalDateTime updatedAt;
	
	
	@ManyToMany
	@JoinTable(name="club_has_playlist",joinColumns = @JoinColumn(name="club_id")
	, inverseJoinColumns = @JoinColumn(name="playlist_id"))
	private List<Playlist> clubPlaylists;
	
	@ManyToOne
	@JoinColumn(name = "created_by_user_id")
	private User user;
	
	@ManyToMany
	@JoinTable(name="club_has_user",joinColumns = @JoinColumn(name="club_id")
	, inverseJoinColumns = @JoinColumn(name="user_id")) 
	private List<User> clubUsers;
		
		public Club() { }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
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

	public List<Playlist> getClubPlaylists() {
		return clubPlaylists;
	}

	public void setClubPlaylists(List<Playlist> clubPlaylists) {
		this.clubPlaylists = clubPlaylists;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<User> getClubUsers() {
		return clubUsers;
	}

	public void setClubUsers(List<User> clubUsers) {
		this.clubUsers = clubUsers;
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
		Club other = (Club) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Club [id=" + id + ", name=" + name + ", description=" + description + ", imageUrl=" + imageUrl
				+ ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}
	
}
