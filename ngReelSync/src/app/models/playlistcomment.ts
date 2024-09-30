export class PlaylistComment {
  id: number;
  content: string;
  createdAt: string;

  constructor(
    id: number = 0,
  content: string = '',
  createdAt: string = ''
  ){
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
  }
}
