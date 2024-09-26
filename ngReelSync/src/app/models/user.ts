export class User {
  id: number;
  // email: string;
  username: string;
  password: string;
  enabled: boolean;
  role: string | null;
  imageUrl: string | null;
  biography: string | null;
  createdAt: string | null;
  updatedAt: string | null

  constructor(
    id: number = 0,
    // email: string ='',
    username: string = '',
    password: string = '',
    enabled: boolean = true,
    role: string = '',
    imageUrl: string = '',
    biography: string = '',
    createdAt: string = '',
    updatedAt: string = ''
  ){
    this.id = id;
    // this.email = email;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
    this.role = role;
    this.imageUrl = imageUrl;
    this.biography = biography;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt
  }
}

