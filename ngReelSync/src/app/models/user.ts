export class User {
  id: number;
  username: string;
  password: string;
  enabled: boolean;
  role: string | null;
  imageUrl: string | null;
  biography: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  favorites: number[];

  constructor(
    id: number = 0,
    username: string = '',
    password: string = '',
    enabled: boolean = true,
    role: string = '',
    imageUrl: string = '',
    biography: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    favorites: number[] = []
  ){
    this.id = id;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
    this.role = role;
    this.imageUrl = imageUrl;
    this.biography = biography;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.favorites = favorites;
  }
}

