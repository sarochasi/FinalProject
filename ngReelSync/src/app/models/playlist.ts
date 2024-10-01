import { PlaylistComment } from "./playlistcomment"
import { User } from "./user"

export class Playlist {
  id: number
  name: string
  description : string
  createdAt: string
  updatedAt: string
  imageUrl: string
  enabled: boolean
  published: boolean
  creatorId: number
  favorite: boolean
  playlistComments: PlaylistComment[]
  user: User

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    imageUrl: string = '',
    enabled: boolean = true,
    published: boolean = false,
    creatorId: number = 0,
    favorite: boolean = false,
    playlistComments: PlaylistComment[] =[],
    user: User = new User(),
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.imageUrl = imageUrl;
    this.enabled = enabled;
    this.published = published;
    this.creatorId = creatorId;
    this.favorite = favorite;
    this.playlistComments = playlistComments
    this.user = user
  }
}
