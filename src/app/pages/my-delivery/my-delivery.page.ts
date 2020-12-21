import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { DeliveryListComponent } from './componenets/delivery-list/delivery-list.component';
import { CountPendingService } from '../../services/count-pending.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-my-delivery',
  templateUrl: './my-delivery.page.html',
  styleUrls: ['./my-delivery.page.scss'],
})
export class MyDeliveryPage implements OnInit {

  public countPending: number;

  constructor(private countPendingService: CountPendingService
    , private router: Router
    , private menuController: MenuController ) { 
  }

  ngOnInit() {
    this.eneableMenu();
    this.countPendingService.change.subscribe(
      count => {
        this.countPending = count;
      }
    );
    this.router.navigate(['myDelivery','deliveryList','d,e']);
  }

  eneableMenu()
  {
    this.menuController.enable(true);
  }
}
