import { User } from "./user";

export class Club {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  user: User;

  constructor(
    id: number = 0,
  name: string = '',
  description: string = '',
  imageUrl: string = '',
  createdAt: string = '',
  updatedAt: string = '',
  user: User = new User()

  ){
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user
  }
}
