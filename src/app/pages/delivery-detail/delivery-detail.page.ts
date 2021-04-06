import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.page.html',
  styleUrls: ['./delivery-detail.page.scss'],
})
export class DeliveryDetailPage implements OnInit {

  deliveryIdCurrent : string;
  statusIdCurrent   : string;

  constructor(private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const deliveryId: string = String(params.get("deliveryId"));
        const statusId  : string = String(params.get("statusId"));
        this.deliveryIdCurrent    = deliveryId;
        this.statusIdCurrent      = statusId;
        }
    );
    this.router.navigate(['delivery-detail',this.deliveryIdCurrent,this.statusIdCurrent,'detailLocation',this.deliveryIdCurrent]);
  }
}
