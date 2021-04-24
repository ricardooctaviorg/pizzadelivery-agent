import { Injectable } from '@angular/core';
import { Delivery } from '../interfaces/delivery';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private deliveries            :Delivery[] = new Array();

  constructor() { 
    this.localStorageService = localStorage;
  }

  clearLocalStorage(){
    const darkThemeCurrent = this.getDarkTheme();
    this.localStorageService.clear();
    this.updateDarkTheme(darkThemeCurrent);
  }

  setDeliveries(deliveries : Delivery[]):void{
    this.localStorageService.setItem('deliveries', JSON.stringify(deliveries));
  }

  updateDarkTheme(darkTheme:string):void{
    this.localStorageService.setItem('darkTheme', darkTheme);
  }

  updateBasicLocalStorage(avatar: string, name: string){
    this.setAvatar(avatar);
    this.setName(name);
  }

  setUserId(userId:string):void{
    this.localStorageService.setItem('userId', userId);
  }

  setName(name:string):void{
    this.localStorageService.setItem('name', name);
  }

  setToken(token:string):void{
    this.localStorageService.setItem('token', token);
  }

  setAvatar(avatar:string):void{
    this.localStorageService.setItem('avatar', avatar);
  }

  getToken():string{
    return this.localStorageService.getItem('token');
  }

  getUserId():string{
    return this.localStorageService.getItem('userId');
  }

  getName():string{
    return this.localStorageService.getItem('name');
  }

  getAvatar():string{
    return this.localStorageService.getItem('avatar');
  }

  getDarkTheme():string{
    return this.localStorageService.getItem('darkTheme');
  }

  getDeliveries():any{
    return JSON.parse(this.localStorageService.getItem('deliveries'));
  }

  getDeliveryByDeliveryId(deliveryId:string):Delivery{
    this.deliveries = JSON.parse(this.localStorageService.getItem('deliveries')) as Delivery[];
    for(let a of this.deliveries)
      if(a.deliveryId == deliveryId)
        return a;
  }
}
