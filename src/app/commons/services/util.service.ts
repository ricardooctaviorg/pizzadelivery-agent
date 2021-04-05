import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MenuOpt } from '../interfaces/menu-opt';
import { Observable } from 'rxjs';

//const GATEWAY_VALUE = 'http://localhost:' + '3000';
const GATEWAY_VALUE = 'https://pizzadelivery-services.herokuapp.com';

const GETAVATARS = GATEWAY_VALUE
  + '/AvatarCatalog'
  + "/getByType";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private httpClient:HttpClient) { }

  public getMainMunuOptions(){
    return this.httpClient.get<MenuOpt[]>('/assets/json/mainMenu.json');
  }

  public getAvatarCatalog(): Observable<any> {
    const params = new HttpParams()
      .set('avatarType', 'agent')

    const httpOptionsX =
    {
      params
    };
    return this.httpClient.get<any>(`${GETAVATARS}`, httpOptionsX);
  }
}
