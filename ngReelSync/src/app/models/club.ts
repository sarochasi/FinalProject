import { Playlist } from "./playlist";
import { User } from "./user";

export class Club {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  creatorId: number;
  clubUsers: User[];
  clubPlaylists: Playlist[];


  constructor(
    id: number = 0,
  name: string = '',
  description: string = '',
  imageUrl: string = '',
  createdAt: string = '',
  updatedAt: string = '',
  user: User = new User(),
  creatorId: number = 0,
  clubUsers: User[] = [],
  clubPlaylists: Playlist[] = [],


  ){
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.creatorId = creatorId;
    this.clubUsers = clubUsers;
    this.clubPlaylists = clubPlaylists;

  }
}
