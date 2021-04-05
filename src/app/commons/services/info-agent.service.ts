import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoAgentService {

  agentInfo = {
    name: ""
    , avatarId: ""
  }
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendAgentInfo(agnetInfo: any) {
    this.agentInfo = agnetInfo;
    this.change.emit(this.agentInfo);
  }

}
