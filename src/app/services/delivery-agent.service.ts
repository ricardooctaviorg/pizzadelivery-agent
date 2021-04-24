import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../commons/interfaces/delivery';
import { StorageService } from '../commons/services/storage.service';
import { environment } from '../../environments/environment';

const GATEWAY_VALUE       = environment.gateway;
const DELIVERY_RESOURCE   = environment.deliveryResource;


const FINDBYAGENTID     = GATEWAY_VALUE
  + DELIVERY_RESOURCE
  + '/findByAgentId';

const COUNTGROUPSSTATUS = GATEWAY_VALUE
  + DELIVERY_RESOURCE
  + '/countGroupsStatus';

const UPDATEDELIVERY    = GATEWAY_VALUE
  + DELIVERY_RESOURCE;

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

  public countGroupsStatus(agentId: string
    , startDate: Date
    , endDate: Date): Observable<any> {

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());

    const params = new HttpParams()
      .set('agentId', agentId)
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    const httpOptionsX =
    {
      headers
      , params
    };
    return this.httpClient.get<any>(`${COUNTGROUPSSTATUS}`, httpOptionsX);
  }

  public updateDelivery(delivery: Delivery): Observable<any> {

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());
    const httpOptionsX =
    {
      headers
    };
    return this.httpClient.post<any>(`${UPDATEDELIVERY}/`, delivery, httpOptionsX)
  }
}
