import { Pipe, PipeTransform } from '@angular/core';
import { GroupStatusAgent } from '../enums/group-status-agent.enum';

@Pipe({
  name: 'statusGroupTitle'
})
export class StatusGroupTitlePipe implements PipeTransform {

  transform(value: any): string {
    let response: string;
    switch(value){
      case GroupStatusAgent.PENDING_ORDERS:
        response = ' PENDIENTES ';
      break;
      case GroupStatusAgent.FINISH_ORDERS:
        response = ' FINALIZADAS ';
      break;

    }
    return response;
  }

}

