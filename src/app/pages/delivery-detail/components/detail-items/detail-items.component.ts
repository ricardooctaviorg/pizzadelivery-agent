import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../commons/services/storage.service';
import { Delivery } from '../../../../commons/interfaces/delivery';
import { InfoAgentService } from '../../../../commons/services/info-agent.service';

const DELIVERY_INFO   = "delivery";

@Component({
  selector: 'app-detail-items',
  templateUrl: './detail-items.component.html',
  styleUrls: ['./detail-items.component.scss'],
})
export class DetailItemsComponent implements OnInit {

  deliveries      : Delivery[] = new Array();
  ordersCurrent   : any[]= new Array();
  amountCurrent   : number;

  constructor(private storageService  : StorageService
    , private route                   : ActivatedRoute
    , private infoAgentService        : InfoAgentService) { }

  ngOnInit() {
    this.deliveries =  this.storageService.getDeliveries() as Delivery[];
    this.route.paramMap.subscribe(
      params => {
        let deliveryIdCurrent: string = String(params.get("deliveryId"));
        deliveryIdCurrent = deliveryIdCurrent.replace(',','');
        for(let a of this.deliveries)
          if(a.deliveryId == deliveryIdCurrent){
            this.ordersCurrent = a.orders;
            this.amountCurrent = a.totalAmount;
          }

          this.infoAgentService.sendDetailTypeTltle(DELIVERY_INFO);
      }
    );

    

  }

}
