import { Injectable } from '@angular/core';
import { UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AgentDeliveryGuard implements CanLoad {

  constructor(private securityService: SecurityService){

  }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.securityService.verifyToken();
  }
  
}
