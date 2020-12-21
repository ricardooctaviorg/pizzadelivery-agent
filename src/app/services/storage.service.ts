import { Injectable } from '@angular/core';
import { PizzaDelivery } from '../commons/interfaces/pizza-delivery';
import { Observable, ObservedValueOf, of } from 'rxjs';

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
    this.localStorageService.clear();
    this.updateDarkTheme('T');
  }

  setPizzaDeliverys(pizzaDeliverys:PizzaDelivery[]):void{
    this.localStorageService.setItem('pizzaDeliverys', JSON.stringify(pizzaDeliverys));
  }

  updateDarkTheme(darkTheme:string):void{
    this.localStorageService.setItem('darkTheme', darkTheme);
  }

  setAgentId(agentId:string):void{
    this.localStorageService.setItem('agentId', agentId);
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

  getAgentId():string{
    return this.localStorageService.getItem('agentId');
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
