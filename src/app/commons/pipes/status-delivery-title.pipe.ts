import { Pipe, PipeTransform } from '@angular/core';
import { StatusDelivery } from '../enums/status-delivery.enum';

@Pipe({
  name: 'statusDeliveryTitle'
})
export class StatusDeliveryTitlePipe implements PipeTransform {

  transform(value: any): string {
    let response: string;
    switch(value){
      case StatusDelivery.DELIVERY_ASSIGNED:
        response = ' ASIGNADA ';
      break;
      case StatusDelivery.DELIVERY_ONWAY:
        response = ' EN CAMINO ';
      break;
      case StatusDelivery.DELIVERY_COMPLETE:
        response = ' ENTREGADA ';
      break;
      case StatusDelivery.DELIVERY_FAIL:
        response = ' NO ENTREGADA ';
      break;
    }
    return response;
  }

}
