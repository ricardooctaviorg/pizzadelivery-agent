import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountStatusService {

  countStatus: string = "";
  @Output() change: EventEmitter<string> = new EventEmitter();

  constructor() { }

  sendCountStatus(countStatus: string) {
    this.countStatus = countStatus;
    this.change.emit(this.countStatus);
  }
}
