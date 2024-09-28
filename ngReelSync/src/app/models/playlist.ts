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
  }
}
