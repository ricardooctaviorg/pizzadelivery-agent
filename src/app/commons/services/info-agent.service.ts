import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoAgentService {

  agentInfo = {
    name: ""
    , avatarId: ""
  }

  detailTitleType: string = "";

  @Output() infoMenu            : EventEmitter<any> = new EventEmitter();
  @Output() detailTypeTitle   : EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendAgentInfo(agnetInfo: any) {
    this.agentInfo = agnetInfo;
    this.infoMenu.emit(this.agentInfo);
  }

  sendDetailTypeTltle(title: string) {
    this.detailTitleType = title;
    this.detailTypeTitle.emit(this.detailTitleType);
  }

}
