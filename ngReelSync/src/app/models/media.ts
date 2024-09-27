import { User } from "./user";

export class Media {
  id: number;
  sourceUrl: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  enabled: boolean;


  constructor(
    id: number = 0,
  sourceUrl: string = '',
  name: string = '',
  createdAt: string = '',
  updatedAt: string = '',
  description: string = '',
  enabled: boolean = true,

  ){
    this.id = id;
    this.sourceUrl = sourceUrl;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
    this.enabled = enabled;

  }

}
