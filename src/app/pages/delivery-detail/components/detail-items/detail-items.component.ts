import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../commons/services/storage.service';
import { PizzaDelivery } from '../../../../commons/interfaces/pizza-delivery';
import { InfoAgentService } from '../../../../commons/services/info-agent.service';

const DELIVERY_INFO   = "delivery";

@Component({
  selector: 'app-detail-items',
  templateUrl: './detail-items.component.html',
  styleUrls: ['./detail-items.component.scss'],
})
export class DetailItemsComponent implements OnInit {

  pizzaDeliverys  : PizzaDelivery[] = new Array();
  ordersCurrent   : any[]= new Array();
  amountCurrent   : string;

  constructor(private storageService  : StorageService
    , private route                   : ActivatedRoute
    , private infoAgentService        : InfoAgentService) { }

  ngOnInit() {
    this.pizzaDeliverys =  this.storageService.getPizzaDeliverys() as PizzaDelivery[];
    this.route.paramMap.subscribe(
      params => {
        let deliveryIdCurrent: string = String(params.get("deliveryId"));
        deliveryIdCurrent = deliveryIdCurrent.replace(',','');
        for(let a of this.pizzaDeliverys)
          if(a.deliveryId == deliveryIdCurrent){
            this.ordersCurrent = a.orders;
            this.amountCurrent = a.totalAmount;
          }

          this.infoAgentService.sendDetailTypeTltle(DELIVERY_INFO);
      }
    );

    

  }

}
