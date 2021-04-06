import { Pipe, PipeTransform } from '@angular/core';
import { StatusDelivery } from '../enums/status-delivery.enum';

@Pipe({
  name: 'statusDeliveryIcon'
})
export class StatusDeliveryIcon implements PipeTransform {

  transform(value: string): string {
    let response: string;
    switch(value){
      case StatusDelivery.DELIVERY_PENDING.toString():
        response = 'storefront';
      break;
      case StatusDelivery.DELIVERY_CANCELED.toString():
        response = 'alert-circle';
      break;
      case StatusDelivery.DELIVERY_CONFIRMED.toString():
        response = 'thumbs-up';
      break;
      case StatusDelivery.DELIVERY_PREPARING.toString():
        response = 'bonfire';
      break;
      case StatusDelivery.DELIVERY_ASSIGNED.toString():
        response = 'bag-add';
      break;
      case StatusDelivery.DELIVERY_ONWAY.toString():
        response = 'rocket';
      break;
      case StatusDelivery.DELIVERY_COMPLETE.toString():
        response = 'bag-check';
      break;
      case StatusDelivery.DELIVERY_FAIL.toString():
        response = 'thumbs-down';
      break;

    }
    return response;
  }

}