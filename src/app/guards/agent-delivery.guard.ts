import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { DeliveryAgentService } from '../services/delivery-agent.service';

@Injectable({
  providedIn: 'root'
})
export class AgentDeliveryGuard implements CanLoad {

  constructor(private deliveryAgentService: DeliveryAgentService){

  }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.deliveryAgentService.verifyToken();
  }
  
}
