export class Playlistcomment {
  id: number;
  content: string;
  createdAt: string;

  constructor(
    id: number,
  content: string,
  createdAt: string,
  ){
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
  }
}
