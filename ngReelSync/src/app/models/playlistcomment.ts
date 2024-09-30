import { User } from "./user";

export class PlaylistComment {
  id: number;
  content: string;
  user: User;
  createdAt: string;

  constructor(
    id: number = 0,
    content: string = '',
    user: User = new User(),
    createdAt: string = ''
  ){
    this.id = id;
    this.content = content;
    this.user = user;
    this.createdAt = createdAt;
  }
}
