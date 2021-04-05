import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import { PizzaDelivery } from '../../../../commons/interfaces/pizza-delivery';

@Component({
  selector: 'app-detail-items',
  templateUrl: './detail-items.component.html',
  styleUrls: ['./detail-items.component.scss'],
})
export class DetailItemsComponent implements OnInit {

  pizzaDeliverys: PizzaDelivery[] = new Array();
  itemsCurrent: any[]= new Array();
  amountCurrent:string;

  constructor(private storageService: StorageService
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.pizzaDeliverys =  this.storageService.getPizzaDeliverys() as PizzaDelivery[];
    this.route.paramMap.subscribe(
      params => {
        let deliveryIdCurrent: string = String(params.get("deliveryId"));
        deliveryIdCurrent = deliveryIdCurrent.replace(',','');
        for(let a of this.pizzaDeliverys)
          if(a.deliveryId == deliveryIdCurrent){
            this.itemsCurrent = a.items;
            this.amountCurrent = a.totalAmount;
          }
      }
    );

  }

}