import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuOpt } from '../commons/interfaces/menu-opt';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }

  public getMainMunuOptions(){
    return this.http.get<MenuOpt[]>('/assets/json/mainMenu.json');
  }
}
