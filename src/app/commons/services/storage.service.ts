import { Injectable } from '@angular/core';
import { PizzaDelivery } from '../interfaces/pizza-delivery';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private pizzaDeliverys:PizzaDelivery[] = new Array();

  constructor() { 
    this.localStorageService = localStorage;
  }

  clearLocalStorage(){
    const darkThemeCurrent = this.getDarkTheme();
    this.localStorageService.clear();
    this.updateDarkTheme(darkThemeCurrent);
  }

  setPizzaDeliverys(pizzaDeliverys:PizzaDelivery[]):void{
    this.localStorageService.setItem('pizzaDeliverys', JSON.stringify(pizzaDeliverys));
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

  getPizzaDeliverys():any{
    return JSON.parse(this.localStorageService.getItem('pizzaDeliverys'));
  }

  getPizzaDeliveryByDeliveryId(deliveryId:string):PizzaDelivery{
    this.pizzaDeliverys = JSON.parse(this.localStorageService.getItem('pizzaDeliverys')) as PizzaDelivery[];
    for(let a of this.pizzaDeliverys)
      if(a.deliveryId == deliveryId)
        return a;
  }
}
