import { Pipe, PipeTransform } from '@angular/core';
import { TypeFail } from '../enums/type-fail.enum';

@Pipe({
  name: 'typeFailTitle'
})
export class TypeFailTitlePipe implements PipeTransform {

  transform(value: any): string {
    let response: string;
    switch(value){
      case TypeFail.CUSTOMER_REJECT:
        response = ' EL CLIENTE RECHAZO EL PEDIDO ';
      break;
      case TypeFail.CUSTOMER_NOT_FOUND:
        response = ' EL CLIENTE NO SE ENCONTRO ';
      break;
      case TypeFail.AGENT_ACCIDENT:
        response = ' PERCANSE ';
      break;
    }
    return response;
  }

}
