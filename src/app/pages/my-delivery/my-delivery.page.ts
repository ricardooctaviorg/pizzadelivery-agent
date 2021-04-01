import { Component, OnInit } from '@angular/core';
import { CountPendingService } from '../../services/count-pending.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CountCompleteService } from '../../services/count-complete.service';

@Component({
  selector: 'app-my-delivery',
  templateUrl: './my-delivery.page.html',
  styleUrls: ['./my-delivery.page.scss'],
})
export class MyDeliveryPage implements OnInit {

  public countPending : number;
  public countComplete: number;

  constructor(private countPendingService: CountPendingService
    , private countCompleteService: CountCompleteService
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
    this.countCompleteService.change.subscribe(
      count => {
        this.countComplete = count;
      }
    );
    this.router.navigate(['myDelivery','deliveryList','d,e']);
  }

  eneableMenu()
  {
    this.menuController.enable(true);
  }
}
