import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CountStatusService } from '../../commons/services/count-status.service';

@Component({
  selector: 'app-my-delivery',
  templateUrl: './my-delivery.page.html',
  styleUrls: ['./my-delivery.page.scss'],
})
export class MyDeliveryPage implements OnInit {

  titleMain           : string = " MIS ENTREGAS ";
  countPending        : number;
  countFinish         : number;
  statusTitleCurrent  : string;
  countStatusArray    : string[];

  constructor(private countStatusService  : CountStatusService
    , private router                      : Router
    , private menuController              : MenuController ) { 
  }

  ngOnInit() {
    this.eneableMenu();
    this.countStatusService.change.subscribe(
      countStatus => {
        this.countStatusArray   = countStatus.split(",");
        this.countPending       = Number(this.countStatusArray[0]);
        this.countFinish        = Number(this.countStatusArray[1]);
        this.statusTitleCurrent = this.countStatusArray[2]
      }
    );
    this.router.navigate(['myDelivery','deliveryList','d,e']);
  }

  eneableMenu()
  {
    this.menuController.enable(true);
  }
}
