import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountPendingService {

  countPending: number = 0;
  @Output() change: EventEmitter<number> = new EventEmitter();

  constructor() { }

  sendCountPending(count:number) {
    this.countPending = count;
    this.change.emit(this.countPending);
  }
}
