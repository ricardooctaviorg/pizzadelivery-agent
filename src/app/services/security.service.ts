import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserDelivery } from '../commons/interfaces/user-delivery';
import { Observable } from 'rxjs';
import { StorageService } from '../commons/services/storage.service';
import { NavController } from '@ionic/angular';
import { InfoAgentService } from '../commons/services/info-agent.service';
import { environment } from '../../environments/environment';

const GATEWAY_VALUE     = environment.gateway;
const SECURITY_RESOURCE = environment.securityResource;

const USERREGISTER = GATEWAY_VALUE
  + SECURITY_RESOURCE
  + '/userRegister';

const LOGIN = GATEWAY_VALUE
  + SECURITY_RESOURCE
  + '/login';

const USERUPDATE = GATEWAY_VALUE
  + SECURITY_RESOURCE
  + '/updateUserDelivery';

const VERIFYTOKEN = GATEWAY_VALUE
  + SECURITY_RESOURCE;

const EXISTUSERBYROLE = GATEWAY_VALUE
  + SECURITY_RESOURCE
  + '/existUserbyRole';

const headers = new HttpHeaders()
  .set('Contet-Type', 'application/json');

const httpOptions = {
  headers
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  token         : string = null;
  userId        : string = null;
  name          : string = null;
  avatar        : string = null;
  userDelivery  : UserDelivery = {};

  constructor(private httpClient  : HttpClient
    , private storageService      : StorageService
    , private navController       : NavController
    , private infoAgentService    : InfoAgentService) { }

  public registerAgent(userDelivery: UserDelivery): Promise<number> {
    return new Promise(
      resolve => {
        this.httpClient.post<any>(`${USERREGISTER}`, userDelivery, httpOptions).subscribe(
          async (data) => {
            if (data.success) {
              await this.saveToken(data.token);
              await this.saveUserId(data.userDelivery.userId);
              await this.saveName(data.userDelivery.name);
              await this.saveAvatar(data.userDelivery.avatar);
              this.infoAgentService.sendAgentInfo({ name: this.storageService.getName(), avatar: this.storageService.getAvatar() });
              resolve(1);
            }
            else {
              this.token = null;
              this.userId = null;
              this.name = null;
              this.avatar = null;
              this.storageService.clearLocalStorage();
              resolve(0);
            }
          }, err => {
            console.log("err", err);
            resolve(-1);
          }
        );
      }
    );
  }

  public login(userId: string, password: string) {

    const data = {
      userId
      , password
    };

    return new Promise(
      resolve => 
        {
        this.httpClient.post<any>(`${LOGIN}`, data, httpOptions).subscribe(
          async (data) => {
            if (data.success) {
              await this.saveToken(data.token);
              await this.saveUserId(data.userId);
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
              resolve(false);
            }
          }
        );
      }
    );
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
      .set('x-token', this.storageService.getToken());

    const httpOptions = {
      headers
    };

    return new Promise<boolean>(
      resolve => {
        this.httpClient.get<any>(`${VERIFYTOKEN}`, httpOptions).subscribe(
          data => {
            if (data.success) {
              this.userDelivery = data.userDelivery;
              this.storageService.updateBasicLocalStorage(this.userDelivery.avatar, this.userDelivery.name);
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

  public existUserByRole(role: string, userId: string): Promise<boolean>{
    const params = new HttpParams()
      .set('role', role )
      .set('userId', userId );
    const httpOptionsX =
    {
      params
    };

    return new Promise<boolean>(
      resolve =>{
        this.httpClient.get<any>(`${EXISTUSERBYROLE}`, httpOptionsX).subscribe(
          data =>
          {
            if(data.length == 0)
              resolve(false);
            else
              resolve(true);
          }
        );
      }
    );


  }

  logOut() {
    this.token = null;
    this.userId = null;
    this.name = null;
    this.avatar = null;
    this.storageService.clearLocalStorage();
    this.navController.navigateRoot('/login', { animated: true });
  }

  async saveToken(token: string) {
    this.token = token;
    this.storageService.setToken(token);
    await this.verifyToken();
  }

  async saveUserId(userId: string) {
    this.userId = userId;
    this.storageService.setUserId(userId);
  }

  async saveName(name: string) {
    this.name = name;
    this.storageService.setName(name);
  }

  async saveAvatar(avatar: string) {
    this.avatar = avatar;
    this.storageService.setAvatar(avatar);
  }

  async loadToken() {
    this.token = await this.storageService.getToken() || null;
  }

  public getTokenInfo(): Observable<any> {
    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());

    const httpOptions = {
      headers
    };
    return this.httpClient.get<any>(`${VERIFYTOKEN}`, httpOptions);
  }

  getAgentDeliveryCurrent() {
    return { ... this.userDelivery }
  }

}
