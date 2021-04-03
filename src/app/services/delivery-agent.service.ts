import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PizzaDelivery } from '../commons/interfaces/pizza-delivery';
import { AgentDelivery } from '../commons/interfaces/agent-delivery';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { InfoAgentService } from './info-agent.service';

//const GATEWAY_VALUE = 'http://localhost:' + '3000';
const GATEWAY_VALUE   = 'https://pizzadelivery-services.herokuapp.com';

const FINDBYAGENTID = GATEWAY_VALUE
  + '/pizzadelivery'
  + '/findByAgentId';

const UPDATEDELIVERY = GATEWAY_VALUE
  + '/pizzadelivery';

const AGENTREGISTER = GATEWAY_VALUE
  + '/agentDelivery'
  + '/agentRegister';

const AGENTUPDATE = GATEWAY_VALUE
  + '/agentDelivery'
  + '/updateAgentDelivery';

const LOGIN = GATEWAY_VALUE
  + '/agentDelivery'
  + '/login';

const VERIFYTOKEN = GATEWAY_VALUE
  + '/agentDelivery'
  + '/';

const GETAVATARS = GATEWAY_VALUE
  + '/avatarCatalog'
  + "/getAllByType";

const headers = new HttpHeaders()
  .set('Contet-Type', 'application/json');

const httpOptions = {
  headers
};

@Injectable({
  providedIn: 'root'
})
export class DeliveryAgentService {


  token: string = null;
  agentId: string = null;
  name: string = null;
  avatar: string = null;
  agentDelivery: AgentDelivery = {

  };

  constructor(private httpClient: HttpClient
    , private storage: Storage
    , private navController: NavController
    , private storageService: StorageService
    , private infoAgentService: InfoAgentService) { }

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

  public registerAgent(agentDelivery: AgentDelivery): Observable<any> {
    return this.httpClient.post<AgentDelivery>(`${AGENTREGISTER}`, agentDelivery, httpOptions);
  }

  public updateAgentDelivery(agentDelivery: AgentDelivery) {

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());
    const httpOptionsX =
    {
      headers
    };

    return new Promise((resolve) => {
      return this.httpClient.post(`${AGENTUPDATE}`, agentDelivery, httpOptionsX).subscribe(
        (data) => {
          if (data['success']){
            this.saveToken(data['token']);
            resolve(true);
          }
          else
            resolve(false);
        }
      );
    });
  }

  public getAvatarCatalog(): Observable<any> {
    const params = new HttpParams()
      .set('avatarType', 'agent')

    const httpOptionsX =
    {
      params
    };
    return this.httpClient.get<any>(`${GETAVATARS}`,httpOptionsX);
  }

  public login(agentId: string, password: string) {

    const data = {
      agentId
      , password
    };

    return new Promise(resolve => {
      this.httpClient.post<any>(`${LOGIN}`, data, httpOptions).subscribe(
        async (data) => {
          if (data.success) {
            this.storageService.setToken(data.token);
            this.storageService.setAgentId(data.agentId);
            this.storageService.setName(data.name);
            this.storageService.setAvatar(data.avatar);
            await this.saveToken(data.token);
            await this.saveAgentId(data.agentId);
            await this.saveName(data.name);
            await this.saveAvatar(data.avatar);
            this.infoAgentService.sendAgentInfo({ name: this.storageService.getName(), avatar: this.storageService.getAvatar() });
            resolve(true);
          }
          else {
            this.token = null;
            this.agentId = null;
            this.name = null;
            this.avatar = null;
            this.storageService.clearLocalStorage();
            this.storage.clear();
            resolve(false);
          }
        }
      );
    });

  }

  logOut() {
    this.token = null;
    this.agentId = null;
    this.name = null;
    this.avatar = null;

    this.storageService.clearLocalStorage();
    this.storage.clear();

    this.navController.navigateRoot('/login', { animated: true });
  }

  getAgentDeliveryCurrent(){
    return { ... this.agentDelivery }
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', this.token);
    await this.verifyToken();
  }

  async saveAgentId(agentId: string) {
    this.agentId = agentId;
    await this.storage.set('agentId', this.agentId);
  }

  async saveName(name: string) {
    this.name = name;
    await this.storage.set('name', this.name);
  }

  async saveAvatar(avatar: string) {
    this.avatar = avatar;
    await this.storage.set('avatar', this.avatar);
  }

  async loadToken() {
    this.token = await this.storage.get('token') || null;
  }

  async verifyToken(): Promise<boolean> {

    await this.loadToken();

    if (!this.token) {
      this.navController.navigateRoot('/login');
      Promise.resolve(false);
    }

    const headers = new HttpHeaders()
      .set('x-token', this.token);

    const httpOptions = {
      headers
    };

    return new Promise<boolean>(
      resolve => {
        this.httpClient.get<any>(`${VERIFYTOKEN}`, httpOptions).subscribe(
          data => {
            if (data.success) {
              this.agentDelivery = data.agentDelivery;
              this.infoAgentService.sendAgentInfo({ name: data.agentDelivery.name, avatar: data.agentDelivery.avatar });
              resolve(true);
            }
            else {
              this.navController.navigateRoot('/login');
              resolve(false);
            }

          }
        );
      }
    );
  }

  public getTokenInfo(): Observable<any> {
    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());

    const httpOptions = {
      headers
    };
    return this.httpClient.get<any>(`${VERIFYTOKEN}`, httpOptions);
  }
}
