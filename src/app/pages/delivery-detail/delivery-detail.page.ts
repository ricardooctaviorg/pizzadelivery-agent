import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.page.html',
  styleUrls: ['./delivery-detail.page.scss'],
})
export class DeliveryDetailPage implements OnInit {

  deliveryIdCurrent:string;

  constructor(private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const deliveryId: string = String(params.get("deliveryId"));
        this.deliveryIdCurrent  = deliveryId;
        console.log("deliveryId ::: " + deliveryId);
        }
    );
    this.router.navigate(['delivery-detail',this.deliveryIdCurrent,'detailLocation',this.deliveryIdCurrent]);
  }
}
