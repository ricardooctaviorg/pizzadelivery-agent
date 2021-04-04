import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PizzaDelivery } from '../commons/interfaces/pizza-delivery';
import { UserDelivery } from '../commons/interfaces/user-delivery';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { InfoAgentService } from './info-agent.service';

//const GATEWAY_VALUE = 'http://localhost:' + '3000';
const GATEWAY_VALUE   = 'https://pizzadelivery-services.herokuapp.com';

const USERREGISTER = GATEWAY_VALUE
  + '/UserDelivery'
  + '/userRegister';

const LOGIN = GATEWAY_VALUE
  + '/UserDelivery'
  + '/login';

const USERUPDATE = GATEWAY_VALUE
  + '/UserDelivery'
  + '/updateUserDelivery';

const VERIFYTOKEN = GATEWAY_VALUE
  + '/UserDelivery'
  + '/';

const FINDBYAGENTID = GATEWAY_VALUE
  + '/Pizzadelivery'
  + '/findByAgentId';

const UPDATEDELIVERY = GATEWAY_VALUE
  + '/Pizzadelivery';

const GETAVATARS = GATEWAY_VALUE
  + '/AvatarCatalog'
  + "/getByType";

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
  userId: string = null;
  name: string = null;
  avatar: string = null;
  userDelivery: UserDelivery = {

  };

  constructor(private httpClient: HttpClient
    , private storage: Storage
    , private navController: NavController
    , private storageService: StorageService
    , private infoAgentService: InfoAgentService) { }


  public registerAgent(userDelivery: UserDelivery): Observable<any> {
    return this.httpClient.post<UserDelivery>(`${USERREGISTER}`, userDelivery, httpOptions);
  }

  public login(userId: string, password: string) {

    const data = {
      userId
      , password
    };

    return new Promise(resolve => {
      this.httpClient.post<any>(`${LOGIN}`, data, httpOptions).subscribe(
        async (data) => {
          if (data.success) {
            this.storageService.setToken(data.token);
            this.storageService.setAgentId(data.userId);
            this.storageService.setName(data.name);
            this.storageService.setAvatar(data.avatar);
            await this.saveToken(data.token);
            await this.saveAgentId(data.userId);
            await this.saveName(data.name);
            await this.saveAvatar(data.avatar);
            this.infoAgentService.sendAgentInfo({ name: this.storageService.getName(), avatar: this.storageService.getAvatar() });
            resolve(true);
          }
          else {
            this.token = null;
            this.userId = null;
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

  public updateAgentDelivery(userDelivery: UserDelivery) {

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());
    const httpOptionsX =
    {
      headers
    };

    return new Promise((resolve) => {
      return this.httpClient.post(`${USERUPDATE}`, userDelivery, httpOptionsX).subscribe(
        (data) => {
          if (data['success']) {
            this.saveToken(data['token']);
            resolve(true);
          }
          else
            resolve(false);
        }
      );
    });
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
              this.userDelivery = data.userDelivery;
              this.infoAgentService.sendAgentInfo({ name: data.userDelivery.name, avatar: data.userDelivery.avatar });
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

  public getAvatarCatalog(): Observable<any> {
    const params = new HttpParams()
      .set('avatarType', 'agent')

    const httpOptionsX =
    {
      params
    };
    return this.httpClient.get<any>(`${GETAVATARS}`, httpOptionsX);
  }



  logOut() {
    this.token = null;
    this.userId = null;
    this.name = null;
    this.avatar = null;

    this.storageService.clearLocalStorage();
    this.storage.clear();

    this.navController.navigateRoot('/login', { animated: true });
  }

  getAgentDeliveryCurrent() {
    return { ... this.userDelivery }
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', this.token);
    await this.verifyToken();
  }

  async saveAgentId(agentId: string) {
    this.userId = agentId;
    await this.storage.set('agentId', this.userId);
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

  public getTokenInfo(): Observable<any> {
    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());

    const httpOptions = {
      headers
    };
    return this.httpClient.get<any>(`${VERIFYTOKEN}`, httpOptions);
  }
}
