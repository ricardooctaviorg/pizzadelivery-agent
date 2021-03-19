import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountCompleteService {

  countComplete: number = 0;
  @Output() change: EventEmitter<number> = new EventEmitter();

  constructor() { }

  sendCountComplete(count:number) {
    this.countComplete = count;
    this.change.emit(this.countComplete);
  }
}
