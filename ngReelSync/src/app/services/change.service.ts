import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {

  changeSignal = signal(0);
  readonly changeMade = this.changeSignal.asReadonly();

  constructor() { }

  makeChange(): void {
    this.changeSignal.update((v)=>v+1);
  }
}
