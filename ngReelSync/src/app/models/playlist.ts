export class Playlist {
  id: number
  name: string
  description : string
  createdAt: string
  updatedAt: string
  imageUrl: string
  enabled: boolean
  published: boolean

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    imageUrl: string = '',
    enabled: boolean = true,
    published: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.imageUrl = imageUrl;
    this.enabled = enabled;
    this.published = published;
  }
}
