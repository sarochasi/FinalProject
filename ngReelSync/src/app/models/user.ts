export class User {
  id: number;
  email: string;
  username: string;
  password: string;
  enabled: boolean;
  role: string | null;
  biography: string;

  constructor(
    id: number = 0,
    email: string ='',
    username: string = '',
    password: string = '',
    enabled: boolean = true,
    role: string = '',
    biography: string = ''
  ){
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
    this.role = role;
    this.biography = biography;
  }
}

