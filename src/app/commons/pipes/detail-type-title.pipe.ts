import { Pipe, PipeTransform } from '@angular/core';
import { TypeDetailStatus } from '../enums/type-detail-status.enum';

@Pipe({
  name: 'detailTypeTitle'
})
export class DetailTypeTitlePipe implements PipeTransform {

  transform(value: any): string {
    let response: string;
    switch(value){
      case TypeDetailStatus.DELIVERY_LOCATION:
        response = ' UBICACIÓN ';
      break;
      case TypeDetailStatus.DELIVERY_INFO:
        response = ' PEDIDO ';
      break;

    }
    return response;
  }

}

