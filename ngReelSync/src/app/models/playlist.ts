import { PlaylistComment } from "./playlistcomment"
import { Tag } from "./tag"
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
  tags: Tag[]

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
    tags: Tag[] = [],
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
    this.tags = tags;
  }
}
