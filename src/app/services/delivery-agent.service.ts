import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PizzaDelivery } from '../commons/interfaces/pizza-delivery';
import { StorageService } from './storage.service';

//const GATEWAY_VALUE = 'http://localhost:' + '3000';
const GATEWAY_VALUE   = 'https://pizzadelivery-services.herokuapp.com';

const FINDBYAGENTID = GATEWAY_VALUE
  + '/Pizzadelivery'
  + '/findByAgentId';

const UPDATEDELIVERY = GATEWAY_VALUE
  + '/Pizzadelivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAgentService {

  constructor(private httpClient  : HttpClient
    , private storageService      : StorageService) { }

  public findByAgentId(agentId: string
    , statusId: string[]
    , startDate: Date
    , endDate: Date
    , page: string
    , size: string
    , sort: string): Observable<any> {

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());

    const params = new HttpParams()
      .set('agentId', agentId)
      .set('statusId', statusId.toString())
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString())
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    const httpOptionsX =
    {
      headers
      , params
    };
    return this.httpClient.get<any>(`${FINDBYAGENTID}`, httpOptionsX);
  }

  public updateDelivery(delivery: PizzaDelivery): Observable<any> {

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());
    const httpOptionsX =
    {
      headers
    };
    return this.httpClient.post<any>(`${UPDATEDELIVERY}/`, delivery, httpOptionsX)
  }
}
