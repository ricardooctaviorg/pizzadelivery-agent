import { Pipe, PipeTransform } from '@angular/core';
import { TypeFail } from '../enums/type-fail.enum';

@Pipe({
  name: 'prettyPhone'
})
export class PrettyPhonePipe implements PipeTransform {

  transform(phoneX: string): string {
    
    let a = phoneX.substring(0,2);
    let b = phoneX.substring(2,6);
    let c = phoneX.substring(6,10);

    return a + " " + b + " " + c;
  }

}
